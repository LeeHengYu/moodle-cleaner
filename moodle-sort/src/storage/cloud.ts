import { getAllStorageKeys } from "../constants/storage_key";
import { debounce } from "../deboucer";

export const initFliterStateFromCloud = (
  callback: (result: Record<string, any>) => void
) => {
  chrome.storage.sync.get(getAllStorageKeys(), (result) => {
    callback(result);
  });
};

export const saveParamToCloud = (key: string, value: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};

const saveCourseNoteToCloudImmediate = (
  courseId: number,
  value: string
): Promise<void> => {
  const key = `course_note_${courseId}`;
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};

export const saveCourseNoteToCloud = debounce(
  saveCourseNoteToCloudImmediate,
  250
);

export const getCourseNoteFromCloud = (
  courseId: number,
  callback: (result: string | null) => void
) => {
  const key = `course_note_${courseId}`;
  chrome.storage.sync.get([key], (result) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving course note:", chrome.runtime.lastError);
      callback(null);
    } else {
      callback(result[key] ?? null);
    }
  });
};
