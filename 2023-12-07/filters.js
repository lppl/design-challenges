import { onDataEventValue } from "../utils/dataEvents.js";
import { safeStartViewTransition } from "../utils/safeStartViewTransition.js";

onDataEventValue("change", "toggle-filter", (event) => {
  if (!event.target.checked) {
    removeFilterByValue(event.target.value);
  } else if (event.target.checked) {
    addActiveFilter(
      event.target.attributes.getNamedItem("data-category-name").value,
      event.target.attributes.getNamedItem("data-filter-name").value,
      event.target.value,
    );
  }
});

onDataEventValue("click", "remove-filter", (event) => {
  removeFilterByValue(event.target.value);
});

function addActiveFilter(categoryName, filterName, filterValue) {
  safeStartViewTransition(() => {
    const template = document.getElementById("active-filter-template").innerHTML;
    const parent = document.getElementById("active-filters");
    const btn = template
      .replace(`{categoryName}`, categoryName)
      .replace(`{filterName}`, filterName)
      .replace(`{filterValue}`, filterValue);
    const x = document.createElement("div");
    x.innerHTML = btn;
    console.log({ ch: x.childNodes[1] });
    parent.append(x.childNodes[1]);
  });
}

function removeFilterByValue(value) {
  safeStartViewTransition(() => {
    const activeButtons = document.querySelectorAll(`button[value=${JSON.stringify(value)}]`);
    for (const btn of activeButtons) {
      btn.remove();
    }
    const els = document.querySelectorAll(`input[type=checkbox][value=${JSON.stringify(value)}]`);
    for (const input of els) {
      input.checked = false;
    }
  });
}

export {};
