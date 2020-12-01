/**
 * Fetches swedish holidays from Svenska Dagar 2.1 (API)
 * @returns {Promise} Array of days in a month
 */
async function fetchSwedishHolidays() {
  const dataPath =
    "https://sholiday.faboul.se/dagar/v2.1/" +
    startDate.getFullYear() +
    "/" +
    (startDate.getMonth() + 1);
  const response = await fetch(dataPath);
  const result = await response.json();
  return result;
}

/**
 * Renders swedish holidays to day cells
 */
async function renderSwedishHolidays() {
  const result = await fetchSwedishHolidays();

  for (let i = 0; i < result.dagar.length; i++) {
    const holiday = result.dagar[i].helgdag;
    if (holiday) {
      const holidayPara = document.createElement("p");
      holidayPara.classList.add("text-red-600", "holiday-para");
      holidayPara.innerText = holiday;
      const date = result.dagar[i].datum;
      const dayBox = document.getElementById(date);
      dayBox.append(holidayPara);
    }
  }
}
