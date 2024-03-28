export const showNotification = (
  message: string,
  duration = 2000,
  setNotification: (v: string) => void
) => {
  setNotification(message);
  setTimeout(() => {
    setNotification('');
  }, duration);
};
