export function byId(id, expectedConstructor = HTMLElement) {
  const el = document.getElementById(id);
  if (!el) {
    throw Error(`Element ${id} does not exist`);
  } else if (el instanceof expectedConstructor) {
    return el;
  } else {
    throw Error(`Element ${id} is not of requested type ${expectedConstructor.name}`);
  }
}
