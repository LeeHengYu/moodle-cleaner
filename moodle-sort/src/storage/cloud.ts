import { getAllStorageKeys } from "../constants/storage_key";
import { debounce } from "../deboucer";

export const initStateFromCloud = (
  callback: (result: Record<string, any>) => void
) => {
  chrome.storage.sync.get(getAllStorageKeys(), (result) => {
    callback(result);
  });
};

export const saveToStorageImmediate = (
  key: string,
  value: any
): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}; // TODO: move to cloud storage helper

export const saveToStorage = debounce(saveToStorageImmediate, 250);
