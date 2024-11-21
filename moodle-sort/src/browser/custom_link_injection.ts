import { LinkModel } from "../service/firebase_hooks";

export const sendLinksToContentScript = (links: LinkModel[]) => {
  if (!chrome || !chrome.runtime) {
    console.warn("Chrome runtime is not available.");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "INJECT_LINKS", links },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Content script response:", response);
          }
        }
      );
    }
  });
};
