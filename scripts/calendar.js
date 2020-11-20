function calendar() {
  const startDate = new Date("2020-11-01");
  const currentMonth = startDate.getMonth();
  const weekday = startDate.getDay();

  const daysArray = getDaysArray(startDate, currentMonth);
  appendDayBoxes(daysArray);
}

function getDaysArray(startDate, currentMonth) {
  const daysArray = [];

  while (startDate.getMonth() === currentMonth) {
    daysArray.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return daysArray;
}

function addDay() {
  console.log("day");
}

function addBlank() {
  console.log("blank");
}

function appendDayBoxes(daysArray) {
  let dayIndex = 1;
  const startDate = new Date("2020-11-01"); // sätta daysArray[0].getDay() istället?
  const weekday = startDate.getDay(); // och i så fall ta bort denna

  for (let i = 0; i < 37; i++) {
    if (dayIndex != weekday && dayIndex < 7) {
      addBlank();
      dayIndex++;
      i++;
    } else {
      for (const day of daysArray) {
        addDay();
        i++;
      }
    }
  }
}

/*
for (const day of daysArray) {
  let i = 1 // första dagen i vår kalender, alltså måndag

  if ((!(i = day.getDay()) && !(i === 7))  // Om inte första cellen i griden (1) är lika med månadens första index (0)
    appendBlank() // append så många blanks som behövs
    i++
    }
    else {
      appendDay(day)
    }
  }
}
*/
