/**
 * Animates the toggle between months in calendar. Next month to slide in.
 * @param {HTMLElement} element Element to animate
 * @param {Number} runTime Duration of animation
 */
function runNextMonthAnimation(element, runTime) {
  element.animate(
    {
      transform: ["translateX(100%)", "translateX(0)"],
      opacity: [0, 1],
    },
    {
      easing: "ease",
      duration: runTime,
    }
  );
}

/**
 * Animates the toggle between months in calendar. Previous month to slide in.
 * @param {HTMLElement} element Element to animate
 * @param {Number} runTime Duration of animation
 */
function runPrevMonthAnimation(element, runTime) {
  element.animate(
    {
      transform: ["translateX(-100%)", "translateX(0)"],
      opacity: [0, 1],
    },
    {
      easing: "ease",
      duration: runTime,
    }
  );
}

/**
 * Animates opacity of an array of elements.
 * @param {Array<HTMLElement>} elemArray Elements to animate
 * @param {Number} runTime Duration of animation
 */
function runHeaderAnimation(elemArray, runTime) {
  for (const element of elemArray) {
    element.animate(
      {
        opacity: [0, 1],
      },
      {
        easing: "ease",
        duration: runTime,
      }
    );
  }
}

/**
 * Animation for deleting an element. Deleted element to slide out.
 * @param {HTMLElement} element Element to animate
 * @param {Number} runTime Duration of animation
 */
function runDeleteTodoAnimation(element, runTime) {
  element.animate(
    {
      opacity: [1, 0],
      transform: ["translateX(0)", "translateX(100%)"],
    },
    {
      easing: "ease",
      duration: runTime,
    }
  );
}
