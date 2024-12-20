/* global chrome */
const STORAGE_KEY = "saved_courses";

let param_filtered_prefix = "";
let param_must_contain = "";
let param_sem = null;
let param_year = null;

openAndClosePopup();

chrome.storage.sync.get(["prefixes", "mustContain", "sem", "year"], (res) => {
  param_filtered_prefix = res.prefixes || "";
  param_must_contain = res.mustContain || "";

  if ("year" in res) {
    param_year = res.year;
  }
  if ("sem" in res) {
    param_sem = res.sem;
  }

  init(param_year, param_sem);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // link fields: id, title, url
  if (message.type === "INJECT_LINKS" && Array.isArray(message.links)) {
    injectLinks(message.links);
    sendResponse({ status: "success", message: "Links injected successfully" });
  } else {
    sendResponse({ status: "error", message: "Invalid data format" });
  }
});

function init(year = null, sem = null) {
  if (document.getElementById("frontpage-course-list")) {
    selectSem(year, sem);
  }
  createAboutButton();
  if (year && sem) {
    createCourseLinksFromStorage();
  }
}

function saveCoursesToStorage(courses) {
  chrome.storage.sync.set({ [STORAGE_KEY]: courses }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error saving courses:", chrome.runtime.lastError);
    }
  });
}

function getCoursesFromStorage(callback) {
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    callback(result[STORAGE_KEY] || null);
  });
}

function createAboutButton() {
  const navContainer = document.querySelector(".nav.more-nav.navbar-nav");
  if (!navContainer) return;

  const listItem = document.createElement("li");
  listItem.className = "nav-item";
  listItem.setAttribute("role", "none");
  listItem.setAttribute("data-forceintomoremenu", "false");

  const link = document.createElement("a");
  link.className = "nav-link";
  link.href =
    "https://chromewebstore.google.com/detail/moodle-cleaner/nkdagjdaehopkpfaheligcpaigdhdphp";
  link.setAttribute("role", "menuitem");
  link.setAttribute("tabindex", "0");
  link.textContent = "About";

  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");

  listItem.appendChild(link);
  navContainer.appendChild(listItem);
}

function createCourseLinksFromStorage() {
  getCoursesFromStorage((courses) => {
    if (!courses) return;

    const navContainer = document.querySelector(".nav.more-nav.navbar-nav");
    if (!navContainer) return;

    courses.forEach((course) => {
      const listItem = document.createElement("li");
      listItem.className = "nav-item";
      listItem.setAttribute("role", "none");
      listItem.setAttribute("data-forceintomoremenu", "false");

      const link = document.createElement("a");
      link.className = "nav-link";
      link.href = course.url;
      link.setAttribute("role", "menuitem");
      link.setAttribute("tabindex", "0");
      link.textContent = course.code;

      listItem.appendChild(link);
      navContainer.appendChild(listItem);
    });
  });
}

function parseFilteredPrefix(input) {
  if (input.trim().length === 0) return [];
  return input.split(";").map((item) => item.trim().toLowerCase());
}

function parseMustContainString(input) {
  if (input.trim().length === 0) return [];
  return input
    .split(";")
    .filter((s) => s.includes("/"))
    .map((item) => {
      const [code, name] = item.trim().split("/");
      return { code: code.toLowerCase(), name };
    });
}

function convertYear(year) {
  return `${year}-${(year + 1) % 100}`;
}

function selectSem(year, sem) {
  const parsedFilteredPrefix = parseFilteredPrefix(param_filtered_prefix);
  const parsedMustContain = parseMustContainString(param_must_contain);

  const courseContainer = document.getElementById("frontpage-course-list");
  if (!courseContainer) return;

  const headerElement = courseContainer.querySelector("h2");
  const courseboxes = Array.from(
    courseContainer.querySelectorAll(".coursebox")
  );

  const filteredCourses = courseboxes.filter((coursebox) => {
    function checkYearInSpan() {
      return Array.from(
        coursebox.querySelectorAll("span.categoryname.text-truncate")
      ).some((span) => span.innerText === convertYear(year));
    }
    const courseNameElement = coursebox.querySelector(".coursename a");
    if (courseNameElement) {
      const courseText = courseNameElement.textContent;

      const hasPrefixMatch =
        parsedFilteredPrefix.length === 0 ||
        parsedFilteredPrefix.some((prefix) =>
          courseText.toLowerCase().startsWith(prefix)
        );

      let hasYearSemMatch = true;
      if (year && sem) {
        const regex = new RegExp(`Section ${sem}[A-Z]?`);
        const regexFa = new RegExp(`Section FA`);
        hasYearSemMatch =
          (regex.test(courseText) || regexFa.test(courseText)) &&
          checkYearInSpan();
      } else if (year) {
        const regexFa = new RegExp(`Section FA`);
        hasYearSemMatch =
          (courseText.includes(String(year)) || regexFa.test(courseText)) &&
          checkYearInSpan();
      } else if (sem) {
        const regex = new RegExp(`\\[Section ${sem}[A-Z]?`);
        hasYearSemMatch = regex.test(courseText);
      }

      const mustContainThisCourse = parsedMustContain.some((item) =>
        courseText.toLowerCase().includes(item.code)
      );

      return (hasPrefixMatch && hasYearSemMatch) || mustContainThisCourse;
    }
    return false;
  });

  filteredCourses.sort((a, b) => {
    const textA = a.querySelector(".coursename a").textContent;
    const textB = b.querySelector(".coursename a").textContent;
    return textA.localeCompare(textB);
  });

  courseContainer.innerHTML = "";
  if (headerElement) {
    courseContainer.appendChild(headerElement);
  }

  filteredCourses.forEach((coursebox) => {
    courseContainer.appendChild(coursebox);
  });

  const resCourses = filteredCourses.map((coursebox) => {
    const courseLink = coursebox.querySelector(".coursename a");
    const courseText = courseLink.textContent;
    const codeMatch = courseText.match(/([A-Z]{4}\d{4})/);
    const defaultCode = codeMatch ? codeMatch[1] : "Unknown";

    const mustContainItem = parsedMustContain.find((item) =>
      courseText.toLowerCase().includes(item.code)
    );

    return {
      code: mustContainItem ? mustContainItem.name : defaultCode,
      url: courseLink.href,
    };
  });

  resCourses.sort((a, b) => a.code.localeCompare(b.code));
  saveCoursesToStorage(resCourses);

  return filteredCourses;
}

function injectLinks(links) {
  const targetDiv = document.querySelector(".courseheaderimage");
  if (links.length === 0 || document.getElementById("customlink-container"))
    return;

  const container = document.createElement("div");
  container.id = "customlink-container";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "6px";
  container.style.marginTop = "24px";

  const header = document.createElement("h3");
  header.textContent = "Custom Link";
  container.appendChild(header);

  links.forEach((link) => {
    const wrapper = document.createElement("div");
    wrapper.style.border = "1px solid #ccc";
    wrapper.style.padding = "8px";
    wrapper.style.borderRadius = "4px";
    wrapper.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

    const anchor = document.createElement("a");
    anchor.className = "courseindex-link nav-link";
    anchor.href = link.url;
    anchor.textContent = link.title;
    anchor.target = "_blank";

    wrapper.appendChild(anchor);
    container.appendChild(wrapper);
  });

  targetDiv.parentNode.insertBefore(container, targetDiv);
}

function openAndClosePopup() {
  if (!document.querySelector(".courseheaderimage")) return;
  chrome.runtime.sendMessage({ type: "OPEN_POPUP" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(
        "Error communicating with background script:",
        chrome.runtime.lastError
      );
    } else {
      console.log("Background script response:", response);
    }
  });
}
