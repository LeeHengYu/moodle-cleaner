document.addEventListener('DOMContentLoaded', () => {
    sortSideBar();
});

function sortSideBar() {
    const sidebarList = document.querySelector('.unlist');
    const links = Array.from(sidebarList.querySelectorAll('a.dimmed'));
    const nonDimmedLinks = Array.from(sidebarList.querySelectorAll(':not(a.dimmed)')).filter(link => link.tagName === 'A');
    nonDimmedLinks.sort((a, b) => a.textContent.localeCompare(b.textContent));
    const sortedLinks = nonDimmedLinks.concat(links);
    sidebarList.innerHTML = '';
    sortedLinks.forEach(link => sidebarList.appendChild(link.parentNode));
}

