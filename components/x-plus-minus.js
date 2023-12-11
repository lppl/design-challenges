"use strict";

import { safeStartViewTransition } from "../utils/safeStartViewTransition.js";

function clamp(min, max, value) {
  return Math.min(max, Math.max(min, value));
}

class PlusMinus extends HTMLElement {
  static observedAttributes = Object.freeze(["value"]);
  innerHTML;

  /** {DocumentFragment} */
  #content;
  /** {HTMLSpanElement} */
  #valueContainer;
  /** {HTMLButtonElement} */
  #plusBtn;
  /** {HTMLButtonElement} */
  #minusBtn;

  constructor() {
    super();

    this.#content = document.getElementById("x-plus-minus-template").content.cloneNode(true);

    this.#valueContainer = this.#content.querySelector("[slot=value]");
    this.#plusBtn = this.#content.querySelector("[value='+']");
    this.#minusBtn = this.#content.querySelector("[value='-']");

    console.assert(this.#valueContainer instanceof HTMLSpanElement, "Template does not contain value slot");
    console.assert(this.#minusBtn instanceof HTMLButtonElement, "Template does not contain minusBtn");
    console.assert(this.#plusBtn instanceof HTMLButtonElement, "Template does not contain plusBtn");

    this.append(this.#content);
  }

  get #min() {
    return Number(this.getAttribute("min") || 0);
  }

  get #max() {
    return Number(this.getAttribute("max") || 9999);
  }

  get #value() {
    const raw = Number(this.getAttribute("value") || 0);
    return clamp(this.#min, this.#max, raw);
  }

  set #value(value) {
    this.setAttribute("value", clamp(this.#min, this.#max, value));
    this.#render();
  }

  #render() {
    this.#valueContainer.innerText = this.#value;
    this.#minusBtn.disabled = this.#value <= this.#min;
    this.#plusBtn.disabled = this.#value >= this.#max;
  }

  connectedCallback() {
    this.#render();

    this.addEventListener("click", (/** PointerEvent */ event) => {
      event.stopPropagation();
      let change = event.shiftKey ? 100 : event.ctrlKey ? 10 : 1;
      switch (event.target.value) {
        case "-":
          this.#value = Math.max(this.#min, this.#value - change);
          return;
        case "+":
          this.#value = Math.min(this.#max, this.#value + change);
          return;
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value" && oldValue !== newValue) {
      this.#render();
    }
  }
}

window.customElements.define("x-plus-minus", PlusMinus);
