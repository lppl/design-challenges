import { safeStartViewTransition } from "../utils/safeStartViewTransition.js";

document.querySelector("nav").addEventListener("click", () => {
  safeStartViewTransition(() => {
    const cart = document.querySelector(".cart");
    console.log({ cart, o: cart.style.opacity });
    cart.style.opacity = cart.style.opacity === "" ? 1 : Math.abs(Number(cart.style.opacity - 1));
    console.log({ cart, o: cart.style.opacity });
  });
});

console.log(document.querySelector("nav svg"));

export {};
