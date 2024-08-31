const filtered_prefix = ["COMP", "STAT"];
const must_contain = ["CUND9003"];
const LOCAL_STORAGE_KEY = 'filteredCourses';

init(2024, 1);

function init(year, sem) {
  if (window.location.href.startsWith('https://moodle.hku.hk/')) {
    if (document.getElementById('frontpage-course-list')) {
      selectSem(year, sem);
    }
    createSidebarFromLocalStorage();
  }
}

function saveCoursesToLocalStorage(courses) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
}

function getCoursesFromLocalStorage() {
  const coursesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return coursesJson ? JSON.parse(coursesJson) : null;
}

function createSidebarSection() {
  const sidebar = document.querySelector('.block-region');
  if (sidebar) {
    const existingSection = sidebar.querySelector('.block.card.mb-3');
    if (existingSection) {
      existingSection.remove();
    }

    const newSection = document.createElement('section');
    newSection.className = 'block card mb-3';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body p-3';
    
    const heading = document.createElement('h5');
    heading.textContent = 'Course Links';
    heading.className = 'card-title d-inline';
    
    cardBody.appendChild(heading);
    newSection.appendChild(cardBody);
    sidebar.insertBefore(newSection, sidebar.firstChild);
    
    return cardBody;
  }
  return null;
}

function createSidebarFromLocalStorage() {
  let sidebarCourses = getCoursesFromLocalStorage();

  if (!sidebarCourses) return;

  const sidebarCardBody = createSidebarSection();

  if (sidebarCardBody) {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.gap = '0.2rem';

    sidebarCourses.forEach(course => {
      const button = document.createElement('a');
      button.href = course.url;
      button.className = 'btn btn-primary';
      button.textContent = course.code;
      button.style.flex = '1 1 auto'; // Allows buttons to grow and shrink
      button.style.whiteSpace = 'nowrap'; // Prevents text wrapping inside buttons
      button.style.overflow = 'hidden';
      button.style.textOverflow = 'ellipsis'; // Adds ellipsis for overflowing text

      buttonContainer.appendChild(button);
    });

    sidebarCardBody.appendChild(buttonContainer);
  }
}

function selectSem(year, sem) {
  const courseContainer = document.getElementById('frontpage-course-list');
  if (!courseContainer) {
    console.log("Course container not found.");
    return;
  }

  const headerElement = courseContainer.querySelector('h2');
  
  const courseboxes = Array.from(courseContainer.querySelectorAll('.coursebox'));
  
  const filteredCourses = courseboxes.filter(coursebox => {
    const courseNameElement = coursebox.querySelector('.coursename a');
    if (courseNameElement) {
      const courseText = courseNameElement.textContent;
      const hasPrefixMatch = filtered_prefix.some(prefix => courseText.startsWith(prefix));
      const hasYearSemMatch = new RegExp(`Section ${sem}[A-Z]?, ${year}`).test(courseText);
      const mustContainThisCourse = must_contain.some(val => courseText.includes(val));
      return (hasPrefixMatch && hasYearSemMatch) || mustContainThisCourse;
    }
    return false;
  });

  filteredCourses.sort((a, b) => {
    const textA = a.querySelector('.coursename a').textContent;
    const textB = b.querySelector('.coursename a').textContent;
    return textA.localeCompare(textB);
  });

  courseContainer.innerHTML = '';
  if (headerElement) {
    courseContainer.appendChild(headerElement);
  }

  filteredCourses.forEach(coursebox => {
    courseContainer.appendChild(coursebox);
  });

  const sidebarCourses = filteredCourses.map(coursebox => {
    const courseLink = coursebox.querySelector('.coursename a');
    const courseText = courseLink.textContent;
    const codeMatch = courseText.match(/([A-Z]{4}\d{4})/);
    return {
      code: codeMatch ? codeMatch[1] : 'Unknown',
      url: courseLink.href
    };
  });

  sidebarCourses.sort((a, b) => a.code.localeCompare(b.code));
  saveCoursesToLocalStorage(sidebarCourses);

  return filteredCourses;
}
