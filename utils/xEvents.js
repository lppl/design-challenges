class XEvent extends Event {
  constructor(name, value) {
    super(`x-event`, {
      cancelable: false,
      bubbles: false,
    });
    this.name = name;
    this.value = value;
  }
}

export function registerXEvents() {
  const dataEventName = `x-event`;

  document.body.addEventListener("click", (event) => {
    const name = event.target?.getAttribute(dataEventName);
    if (name) {
      const value = event.target.value || "";
      trigger(name, value);
    }
  });
}

export function trigger(name, value) {
  const event = new XEvent(name, value);
  console.debug("X-Event: ", name, value, event);
  document.dispatchEvent(event);
}

export function listenFor(name, callback) {
  const listener = (event) => {
    if (event instanceof XEvent) {
      if (event.name === name) {
        callback(event.value);
      }
    }
  };
  document.addEventListener("x-event", listener);
  return () => document.removeEventListener(listener);
}
