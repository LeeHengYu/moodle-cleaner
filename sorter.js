const banned_prefix = ["AASO", "BSC", "ECON", "CS_", "COMP1"];

selected_courses = selectSem(2023, 2);
sortSideBar(banned_prefix);
buildCourseButtonsFromSidebar();
// prependButtonToFrontPage("course 1", "https://google.com/");
// renderCourseButtons(selected_courses);


function sortSideBar(banned_prefix = null) {
    const sidebarList = document.querySelector('.unlist');
    const nonDimmedLinks = Array.from(sidebarList.querySelectorAll('a:not(.dimmed)'))
        .filter(link =>
            link.tagName === 'A' &&
            !banned_prefix.some(prefix => link.textContent.startsWith(prefix))
        );
    nonDimmedLinks.sort((a, b) => a.textContent.localeCompare(b.textContent));
    sidebarList.innerHTML = '';
    nonDimmedLinks.forEach(link => sidebarList.appendChild(link.parentNode));
}

function selectSem(year, sem) {
    const sidebarList = document.querySelector('.unlist');
    const nonDimmedLinks = Array.from(sidebarList.querySelectorAll('a:not(.dimmed)'))
        .filter(link =>
            link.tagName === 'A' &&
            (new RegExp(`Section ${sem}[A-Z]?, ${year}`)).test(link.textContent)
        );

    sidebarList.innerHTML = '';
    nonDimmedLinks.forEach(link => sidebarList.appendChild(link.parentNode));

    return nonDimmedLinks;
}

function renderCourseButtons(selectedCourses) {
    const buttonsContainer = document.createElement('div');
    document.querySelector('.front-page-course-list');
    buttonsContainer.className = 'd-flex';

    selectedCourses.forEach(course => {
        const { href, text } = course.querySelector('a');
        const button = document.createElement('a');
        button.className = 'btn btn-primary mr-2';
        button.href = href;
        button.textContent = text.substring(0, 8);
        buttonsContainer.appendChild(button);
    });
}

function prependButtonContainerToFrontPage(texts, links) {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('d-flex', 'flex-wrap');

    let buttonRow = document.createElement('div');
    buttonRow.classList.add('d-flex', 'mb-2');
    containerDiv.appendChild(buttonRow);

    texts.forEach((text, index) => {
        const button = document.createElement('a');
        button.classList.add('btn', 'btn-primary', 'mr-2');
        button.style.width = '100px';
        button.href = links[index];
        button.textContent = text.substring(0, 8);

        if (buttonRow.childElementCount >= 3) {
            buttonRow = document.createElement('div');
            buttonRow.classList.add('d-flex', 'mb-2');
            containerDiv.appendChild(buttonRow);
        }

        buttonRow.appendChild(button);
    });

    const frontPageCourseListDiv = document.querySelector('#frontpage-course-list');
    if (frontPageCourseListDiv) {
        frontPageCourseListDiv.insertBefore(containerDiv, frontPageCourseListDiv.firstChild);
    } else {
        console.error('The <div> with id "frontpage-course-list" was not found.');
    }
}

function buildCourseButtonsFromSidebar() {
    const sidebarAnchors = document.querySelectorAll('ul.unlist a');
    texts = Array.from(sidebarAnchors).map(a => a.textContent);
    links = Array.from(sidebarAnchors).map(a => a.href);

    prependButtonContainerToFrontPage(texts, links);
}
