document.addEventListener('DOMContentLoaded', () => {
    sortSideBar();
    sortFrontPageCourseList();
});

function sortSideBar() {
    const sidebarList = document.querySelector('.unlist');
    const banned_prefix = ["AASO", "BSC", "ECON", "CS_", "CC"];
    const nonDimmedLinks = Array.from(sidebarList.querySelectorAll('a:not(.dimmed)'))
        .filter(link =>
            link.tagName === 'A' &&
            !banned_prefix.some(prefix => link.textContent.startsWith(prefix))
        );

    nonDimmedLinks.sort((a, b) => a.textContent.localeCompare(b.textContent));
    sidebarList.innerHTML = '';
    nonDimmedLinks.forEach(link => sidebarList.appendChild(link.parentNode));
}

function sortFrontPageCourseList() {
    const courseList = document.querySelector('.frontpage-course-list-enrolled');
    const courseBoxes = Array.from(courseList.querySelectorAll('.coursebox'));
    if (courseBoxes.length == 0) {
        const sortedCourseBoxes = courseBoxes.sort((a, b) => {
            const textA = a.querySelector('h3.coursename').textContent.toLowerCase();
            const textB = b.querySelector('h3.coursename').textContent.toLowerCase();
            if (textA < textB) {
                return -1;
            }
            if (textA > textB) {
                return 1;
            }
            return 0;
        });
        courseList.innerHTML = '';
        sortedCourseBoxes.forEach(courseBox => courseList.appendChild(courseBox));
    }
};
