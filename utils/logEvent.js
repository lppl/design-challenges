import { listenFor } from "./xEvents.js";

listenFor("log", (value) => {
  console.log("Log event", value);
});
