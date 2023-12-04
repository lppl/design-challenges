/**
 * @param {string} name
 * @param {function} callbacks
 */
export default function createToggle(name, ...callbacks) {
  console.assert(name.length > 0);
  console.assert(callbacks.length > 0);

  const key = `toggleKey::${name}`;
  let nextToggle = Number(localStorage.getItem(key) || 0);
  callbacks[nextToggle]();

  return function toggle() {
    nextToggle += 1;
    if (nextToggle >= callbacks.length) {
      nextToggle = 0;
    }

    callbacks[nextToggle]();

    localStorage.setItem(key, nextToggle);
  };
}
