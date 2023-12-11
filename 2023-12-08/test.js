import { safeStartViewTransition } from "../utils/safeStartViewTransition.js";

document.querySelector("nav").addEventListener("click", () => {
  safeStartViewTransition(() => {
    const cart = document.querySelector(".cart");
    const opacity = cart.style.opacity;
    let ret;
    if (opacity === "") {
      ret = 0;
    } else if (Number.isNaN(Number(opacity))) {
      ret = 0;
    } else {
      ret = Number(opacity) === 1 ? 0 : 1;
    }
    cart.style.opacity = ret;
  });
});

export {};
