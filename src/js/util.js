const toKeypressListener = (clickListener) => (e) => {
  if (e.key === 'Enter') return clickListener(e);
  if (e.key === ' ') return e.preventDefault() || clickListener(e);
};

export const addListeners = (element, clickListener) => {
  const keypressListener = toKeypressListener(clickListener);
  element.addEventListener('click', clickListener);
  element.addEventListener('keypress', keypressListener);
  return {
    clickListener,
    keypressListener,
  };
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
