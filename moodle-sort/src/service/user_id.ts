import { v4 as uuidv4 } from "uuid";
export function initializeUserId(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("userUUID", (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      if (result.userUUID) {
        resolve(result.userUUID);
      } else {
        const newUUID = uuidv4();

        chrome.storage.sync.set({ userUUID: newUUID }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
            return;
          }
          resolve(newUUID);
        });
      }
    });
  });
}
