import { listenFor } from "../utils/xEvents.js";

class XPanel extends HTMLElement {
  /** Function */
  unregister = () => undefined;
  /** HTMLDialogElement */
  dialog;

  constructor() {
    super();
    this.dialog = this.querySelector("dialog");
    console.assert(this.dialog instanceof HTMLDialogElement, "XControl panel should contain dialog element");
  }

  connectedCallback() {
    this.unregister = listenFor("toggle-control-panel", (value = "toggle") => {
      switch (value) {
        case "open":
          return this.open();
        case "close":
          return this.close();
        case "toggle":
          return this.toggle();
      }
    });
  }

  toggle() {
    if (this.dialog.hasAttribute("open")) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.dialog.setAttribute("open", "");
    this.dialog.setAttribute("x-keys", "enabled");
  }

  close() {
    this.dialog.removeAttribute("open");
    this.dialog.setAttribute("x-keys", "disabled");
  }

  disconnectCallback() {
    this.unregister();
  }
}

customElements.define("x-control-panel", XPanel);
