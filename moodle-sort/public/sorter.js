const filtered_prefix = [];
const must_contain = [];
const LOCAL_STORAGE_KEY = "filteredCourses";

init(2024, 1);

function init(year = null, sem = null) {
  if (window.location.href.startsWith("https://moodle.hku.hk/")) {
    if (document.getElementById("frontpage-course-list")) {
      selectSem(year, sem);
    }
    if (year && sem) {
      createCourseLinksFromLocalStorage();
    }
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

function selectSem(year, sem) {
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

      var hasPrefixMatch;
      if (filtered_prefix.length == 0) hasPrefixMatch = true;
      else {
        hasPrefixMatch = filtered_prefix.some((prefix) =>
          courseText.startsWith(prefix)
        );
      }

      var hasYearSemMatch;
      if (year && sem) {
        hasYearSemMatch = new RegExp(`Section ${sem}[A-Z]?, ${year}`).test(
          courseText
        );
      } else if (year && !sem) {
        hasYearSemMatch = courseText.includes(String(year));
      } else if (!year && sem) {
        hasYearSemMatch = new RegExp(`Section ${sem}[A-Z]?`).test(courseText);
      } else {
        hasYearSemMatch = true;
      }

      const mustContainThisCourse = must_contain.some((val) =>
        courseText.includes(val)
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
    return {
      code: codeMatch ? codeMatch[1] : "Unknown",
      url: courseLink.href,
    };
  });

  resCourses.sort((a, b) => a.code.localeCompare(b.code));
  saveCoursesToLocalStorage(resCourses);

  return filteredCourses;
}
