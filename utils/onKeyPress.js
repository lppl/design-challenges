/**
 * @param {string} code
 * @param {function} callback
 */
export default function onKeyPress(code, callback) {
  document.addEventListener("keypress", function run(event) {
    if (event.code === code) {
      event.stopPropagation();
      callback();
    }
  });
}
