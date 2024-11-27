/* global chrome */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "OPEN_POPUP") {
    chrome.action
      .openPopup()
      .then(() => {
        console.log("Popup opened successfully");

        setTimeout(() => {
          chrome.runtime.sendMessage({ type: "CLOSE_POPUP" });
        }, 500);

        sendResponse({
          status: "success",
          message: "Popup opened and scheduled for closing",
        });
      })
      .catch((error) => {
        console.error("Failed to open popup:", error);
        sendResponse({ status: "error", message: "Failed to open popup" });
      });

    return true;
  }
});
