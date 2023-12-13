import onKeyPress from "../utils/onKeyPress.js";
import { trigger } from "../utils/xEvents.js";

class XKey extends HTMLElement {
  unregister = () => undefined;
  code = "";
  event = "";
  value = "";
  method = "keypress";

  constructor() {
    super();
    this.event = this.getAttribute("x-event");
    this.code = this.getAttribute("code");
    this.method = this.getAttribute("method") || "keypress";
    this.value = this.getAttribute("value");
  }

  connectedCallback() {
    console.debug("Register XKey", this.code, this.event, this.value);
    this.unregister = onKeyPress(this.code, this.trigger, {
      method: this.method,
    });
  }

  disconnectCallback() {
    this.unregister();
  }

  trigger = () => {
    if (this.isEnabled) {
      trigger(this.event, this.value);
    }
  };

  get isEnabled() {
    for (let i = 10, rootCandidate = this; i >= 0; i--, rootCandidate = rootCandidate.parentElement) {
      if (rootCandidate.hasAttribute("disabled")) {
        return false;
      }
      if (rootCandidate instanceof HTMLDialogElement) {
        return rootCandidate.hasAttribute("open");
      }
      if (rootCandidate.hasAttribute("x-keys")) {
        return rootCandidate.getAttribute("x-keys") !== "disabled";
      }
      if (rootCandidate === document.body) {
        return true;
      }
    }
    if (!i) {
      console.warn("i came down to zero. Your html is very deep, maybe too deep, for the sake of your mind.");
    }
    return true;
  }
}

customElements.define("x-key", XKey);
