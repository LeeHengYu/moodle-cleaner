const banned_prefix = ["AASO", "BSC", "ECON", "CS_", "COMP1"];

selectSem(getYearSem().year, getYearSem().sem);
sortSideBar(banned_prefix);
buildCourseButtonsFromSidebar();
clearBody();


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

function prependButtonContainerToFrontPage(texts, links) {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('d-flex', 'flex-wrap');

    let headerText = document.createElement('h2');
    headerText.textContent = 'Quick Navigation Links';

    let buttonRow = document.createElement('div');
    buttonRow.classList.add('d-flex', 'mb-2');
    containerDiv.appendChild(buttonRow);

    texts.forEach((text, index) => {
        const button = document.createElement('a');
        button.classList.add('btn', 'btn-primary', 'mr-2');
        button.style.width = '70px';
        button.href = links[index];
        button.textContent = text.substring(0, 8);

        if (buttonRow.childElementCount >= 3) {
            buttonRow = document.createElement('div');
            buttonRow.classList.add('d-flex', 'mb-2');
            containerDiv.appendChild(buttonRow);
        }

        buttonRow.appendChild(button);
    });

    var insertLoc = document.querySelector('#frontpage-course-list') || document.querySelector('#page-content');
    if (insertLoc) {
        insertLoc.insertBefore(containerDiv, insertLoc.firstChild);
        insertLoc.insertBefore(headerText, insertLoc.firstChild);
    } else {
        console.error('The <div> with id "frontpage-course-list" was not found.');
    }
}

function buildCourseButtonsFromSidebar() {
    const sidebarAnchors = document.querySelectorAll('.column.c1 a');
    texts = Array.from(sidebarAnchors).map(a => a.textContent);
    links = Array.from(sidebarAnchors).map(a => a.href);

    prependButtonContainerToFrontPage(texts, links);
}

function getYearSem() {
    var time = new Date();
    var year = time.getFullYear();
    const month = time.getMonth();

    var sem = -1;
    if (month >= 7 && month <= 11) {
        sem = 1;
    }
    else {
        sem = 2;
        year--;
    }

    return {
        year: year,
        sem: sem
    }
}

function clearBody() {
    const headers = document.querySelectorAll('h2');
    let courseHeader;
    headers.forEach(h => {
        if (h.textContent.includes('My courses')) {
            courseHeader = h;
        }
    });

    if (courseHeader) {
        courseHeader.remove();
    }

    const enrolledCourseDiv = document.querySelector('.courses.frontpage-course-list-enrolled');
    if (enrolledCourseDiv) {
        enrolledCourseDiv.remove();
    }
}