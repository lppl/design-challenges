import { listenFor } from "../utils/xEvents.js";
import { byId } from "../utils/selectors.js";

listenFor("toggle-element", (id) => {
  const el = byId(id);
  el.style.display = el.style.display === "none" ? null : "none";
});

listenFor("hide-element", (id) => {
  byId(id).style.display = "none";
});

listenFor("show-element", (id) => {
  byId(id).style.display = null;
});
