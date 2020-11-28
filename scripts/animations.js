function runNextMonthAnimation(element, runTime) {
  element.animate(
    {
      opacity: [0, 1],
      transform: ["translateX(100%)", "translateX(0)"],
    },
    runTime
  );
}

function runPrevMonthAnimation(element, runTime) {
  element.animate(
    {
      opacity: [0, 1],
      transform: ["translateX(-100%)", "translateX(0)"],
    },
    runTime
  );
}
