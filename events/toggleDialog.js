import { listenFor } from "../utils/xEvents.js";
import { byId } from "../utils/selectors.js";

listenFor("toggle-dialog", (id) => {
  byId(id, HTMLDialogElement).toggleAttribute("open");
});

listenFor("open-dialog", (id) => {
  byId(id, HTMLDialogElement).setAttribute("open", "");
});

listenFor("close-dialog", (id) => {
  byId(id, HTMLDialogElement).removeAttribute("open");
});
