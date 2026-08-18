let toastListener = null;

export const registerToastListener = (listener) => {
  toastListener = listener;
};

export const unregisterToastListener = () => {
  toastListener = null;
};

export const showToast = (message, type = 'success', duration = 3500) => {
  if (toastListener) {
    toastListener({ id: Date.now() + Math.random(), message, type, duration });
  }
};
