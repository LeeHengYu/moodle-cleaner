/* global chrome */
const STORAGE_KEY = "saved_courses";

let param_filtered_prefix = "";
let param_must_contain = "";
let param_sem = null;
let param_year = null;

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
    "https://github.com/LeeHengYu/moodle-cleaner?tab=readme-ov-file#how-to-use-moodle-cleaner";
  link.setAttribute("role", "menuitem");
  link.setAttribute("tabindex", "0");
  link.textContent = "About Moodle Cleaner";

  // Open link in a new tab
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
  return input.split(";").map((item) => {
    const [code, name] = item.trim().split("/");
    return { code: code.toLowerCase(), name };
  });
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
        const regex = new RegExp(`\\[Section ${sem}[A-Z]?, ${year}\\]`);
        hasYearSemMatch = regex.test(courseText);
      } else if (year) {
        hasYearSemMatch = courseText.includes(String(year));
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
