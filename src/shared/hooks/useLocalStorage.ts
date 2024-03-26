export const useLocalStorage = (key: string, v?: string) => {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  } else {
    if (v) {
      localStorage.setItem(key, v);
    }
    return null;
  }
};
