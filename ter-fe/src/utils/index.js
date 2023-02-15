/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
function debounce(func, wait, immediate) {
  let timeout;
  let args;
  let context;
  let timestamp;
  let result;

  const later = () => {
    // According to the last trigger interval
    const last = +new Date() - timestamp;

    // The last time the wrapped function was called,
    // the interval is last less than the set interval. wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // If it is set to immediate===true, since the start boundary has already been called,
      // there is no need to call it here.
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args == null;
      }
    }
  };

  return (...args1) => {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // If the delay does not exist, reset the delay
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args1);
      context = args1 == null;
    }
    return result;
  };
}

export function flattenArray(arrays) {
  return [].concat(...arrays);
}

export function externalComponent(url) {
  const name = url.split('/').reverse()[0].match(/^(.*?)\.umd/)[1];

  if (window[name]) return window[name];

  window[name] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.addEventListener('load', () => {
      resolve(window[name]);
    });
    script.addEventListener('error', () => {
      reject(new Error(`Error loading ${url}`));
    });
    script.src = url;
    document.head.appendChild(script);
  });

  return window[name];
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export default debounce;
