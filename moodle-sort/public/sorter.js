const filtered_prefix = "comp; stat";
const must_contain = "CUND9003/Canton; ECON1210 AB/TA";
const LOCAL_STORAGE_KEY = "saved_courses";

init(2024, 1);

function init(year = null, sem = null) {
  if (document.getElementById("frontpage-course-list")) {
    selectSem(year, sem);
  }
  if (year && sem) {
    createCourseLinksFromLocalStorage();
  }
}

function saveCoursesToLocalStorage(courses) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
}

function getCoursesFromLocalStorage() {
  const coursesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return coursesJson ? JSON.parse(coursesJson) : null;
}

function createCourseLinksFromLocalStorage() {
  let courses = getCoursesFromLocalStorage();

  if (!courses) return;

  const navContainer = document.querySelector(".nav.more-nav.navbar-nav");
  if (!navContainer) {
    console.log("Navigation container not found.");
    return;
  }

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
}

function parseFilteredPrefix(input) {
  return input.split(";").map((item) => {
    return item.trim();
  });
}

function parseMustContainString(input) {
  return input.split(";").map((item) => {
    const [code, name] = item.trim().split("/");
    return { code, name };
  });
}
function selectSem(year, sem) {
  const parsedFilteredPrefix = parseFilteredPrefix(filtered_prefix);
  const parsedMustContain = parseMustContainString(must_contain);

  const courseContainer = document.getElementById("frontpage-course-list");
  if (!courseContainer) return;

  const headerElement = courseContainer.querySelector("h2");
  const courseboxes = Array.from(
    courseContainer.querySelectorAll(".coursebox")
  );

  const filteredCourses = courseboxes.filter((coursebox) => {
    const courseNameElement = coursebox.querySelector(".coursename a");
    if (courseNameElement) {
      const courseText = courseNameElement.textContent.toLowerCase();

      var hasPrefixMatch;
      if (parsedFilteredPrefix.length == 0) hasPrefixMatch = true;
      else {
        hasPrefixMatch = parsedFilteredPrefix.some((prefix) =>
          courseText.startsWith(prefix.toLowerCase())
        );
      }

      var hasYearSemMatch;
      if (year && sem) {
        hasYearSemMatch = new RegExp(`section ${sem}[a-z]?, ${year}`, "i").test(
          courseText
        );
      } else if (year && !sem) {
        hasYearSemMatch = courseText.includes(String(year));
      } else if (!year && sem) {
        hasYearSemMatch = new RegExp(`section ${sem}[a-z]?`, "i").test(
          courseText
        );
      } else {
        hasYearSemMatch = true;
      }

      const mustContainThisCourse = parsedMustContain.some((item) =>
        courseText.includes(item.code.toLowerCase())
      );

      return (hasPrefixMatch && hasYearSemMatch) || mustContainThisCourse;
    }
    return false;
  });

  filteredCourses.sort((a, b) => {
    const textA = a.querySelector(".coursename a").textContent.toLowerCase();
    const textB = b.querySelector(".coursename a").textContent.toLowerCase();
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
    const codeMatch = courseText.match(/([A-Z]{4}\d{4})/i);
    const defaultCode = codeMatch ? codeMatch[1] : "Unknown";

    const mustContainItem = parsedMustContain.find((item) =>
      courseText.toLowerCase().includes(item.code.toLowerCase())
    );

    return {
      code: mustContainItem ? mustContainItem.name : defaultCode,
      url: courseLink.href,
    };
  });

  resCourses.sort((a, b) =>
    a.code.toLowerCase().localeCompare(b.code.toLowerCase())
  );
  saveCoursesToLocalStorage(resCourses);

  return filteredCourses;
}
