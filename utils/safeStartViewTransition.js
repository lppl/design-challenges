/**
 * Issues to solve:
 * - manage browsers which don't have startViewTransition
 * - some browser don't log errors thrown in startViewTransition
 */
export const safeStartViewTransition = document.startViewTransition
  ? (callback) => {
      return document.startViewTransition(() => {
        try {
          callback();
        } catch (e) {
          console.error(e);
        }
      });
    }
  : (callback) => callback();
