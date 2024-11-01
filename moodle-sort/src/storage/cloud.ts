import { debounce } from "../deboucer";

export const STORAGE_KEY_YEAR = "year";
export const STORAGE_KEY_SEM = "sem";
export const STORAGE_KEY_FILTER_PREFIX = "prefixes";
export const STORAGE_KEY_MUST_CONTAIN = "mustContain";

export const storageKeys = [
  STORAGE_KEY_YEAR,
  STORAGE_KEY_SEM,
  STORAGE_KEY_FILTER_PREFIX,
  STORAGE_KEY_MUST_CONTAIN,
];

export const initFliterStateFromCloud = (
  callback: (result: Record<string, any>) => void
) => {
  chrome.storage.sync.get(storageKeys, (result) => {
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
  callback: (result: string) => void
) => {
  const key = `course_note_${courseId}`;
  chrome.storage.sync.get([key], (result) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving course note:", chrome.runtime.lastError);
    } else {
      if (result !== null) callback(result[key] ?? null);
    }
  });
};
