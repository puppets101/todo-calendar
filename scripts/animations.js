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
