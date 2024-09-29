export const STORAGE_KEY_YEAR = "year";
export const STORAGE_KEY_SEM = "sem";
export const STORAGE_KEY_FILTER_PREFIX = "prefixes";
export const STORAGE_KEY_MUST_CONTAIN = "mustContain";

export const getAllStorageKeys = (): string[] => {
  return [
    STORAGE_KEY_YEAR,
    STORAGE_KEY_SEM,
    STORAGE_KEY_FILTER_PREFIX,
    STORAGE_KEY_MUST_CONTAIN,
  ];
};
