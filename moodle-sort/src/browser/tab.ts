// utils/getCourseId.js

export const getCourseId = () => {
  return new Promise<number>((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.url) {
        const url = new URL(activeTab.url);
        const idParam = url.searchParams.get("id");
        const parsedId = idParam ? Number(idParam) : 0;
        resolve(!isNaN(parsedId) ? parsedId : 0);
      } else {
        resolve(0);
      }
    });
  });
};
