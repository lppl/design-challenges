const allowed = ["keypress", "keydown", "keyup"];

/**
 * @param {string} code
 * @param {function} callback
 */
export default function onKeyPress(code, callback, { method = "keypress" } = {}) {
  function run(event) {
    if (event.code === code) {
      event.stopPropagation();
      callback();
    }
  }

  console.assert(allowed.includes(method), `Press method given is "${method}", but should be one of`, allowed);
  document.addEventListener(method, run);
  return () => document.removeEventListener(method, run);
}
