export const safeStartViewTransition = document.startViewTransition
  ? (callback) => document.startViewTransition(callback)
  : (callback) => callback();
