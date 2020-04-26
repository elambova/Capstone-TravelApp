// updateUI function using the keyword async and updates the allData we have, and attach to selected elements
const updateUI = async (data) => {
  try {
    // loading image hide if data is resive
    document.getElementById("loading").style.display = "none";

    // set display flex to .box holder to show all data
    document.getElementsByClassName("box")[0].style.display = "flex";

    // document.getElementById("add-destination").style.display = "block";

    //This adds the name  to the results span
    document.getElementById("city-result").innerHTML = data.city;

    //This adds the name  to the results span
    document.getElementById("country").innerHTML = data.country;

    //This adds the name  to the results span
    document.getElementById("arrival-date-result").innerHTML = data.start;

    //This adds the name  to the results span
    document.getElementById("departure-date-result").innerHTML = data.end;

    //This adds the temp to the results span
    document.getElementById("long").innerHTML = data.long;

    // This is adding the result data to the span
    document.getElementById("lat").innerHTML = data.lat;

    //This is getting the number of days until the vacation
    const daysAway = data.daysUntilTrip;

    // This is adding the result data to the span
    daysAway <= 1
      ? (document.getElementById("days-away").innerHTML =
          daysAway + " day away!")
      : (document.getElementById("days-away").innerHTML =
          daysAway + " days away!");

    //This is getting the number of days until total for the vacation
    const daysTotal = data.tripLength;

    // This is adding the result data to the span
    daysTotal <= 1
      ? (document.getElementById("trip-length").innerHTML = daysTotal + " day.")
      : (document.getElementById("trip-length").innerHTML =
          daysTotal + " days.");

    // This is adding the result data to the img
    document
      .getElementById("forecast-icon")
      .setAttribute(
        "src",
        `https://www.weatherbit.io/static/img/icons/${data[0].weather.icon}.png`
      );

    // This is adding the result data to the span
    document
      .getElementById("forecast-icon")
      .setAttribute("alt", `${data[0].weather.description}`);

    // This is adding the result data to the span
    document.getElementById("forecast").innerHTML = data[0].weather.description;

    // This is adding the result data to the span
    document.getElementById("high-temp").innerHTML =
      data[0].high_temp + " \xB0C.";

    // This is adding the result data to the span
    document.getElementById("low-temp").innerHTML =
      data[0].low_temp + " \xB0C.";

    // This is adding the result data to the image src
    document
      .getElementById("travel-destination")
      .setAttribute("src", data.picture);

    // This is adding the result data to the image alt
    document
      .getElementById("travel-destination")
      .setAttribute("alt", data.city);

    // This is adding the result data to the p
    document.getElementById("tags").innerHTML = data.tags;

    const multipleDays = document.getElementById("temp-for-multiple-days");

    const total = parseInt(daysAway) + parseInt(daysTotal);

    if (total <= 16) {
      if (multipleDays.hasChildNodes()) {
        multipleDays.innerHTML = "";
        createElementMultipleWeather(multipleDays, data, total);
      } else {
        createElementMultipleWeather(multipleDays, data, total);
      }
    }
  } catch (error) {
    return error;
  }
};

const createElementMultipleWeather = (parent, data, total) => {
  // Div display if total is < or = 16
  parent.style.display = "block";

  // Create heading for parent field
  let headingparent = document.createElement("h2");

  // Add text to heading with total days before and during the trip
  headingparent.innerHTML = `Expected weather before and during the trip for ${total} day/days`;

  // Append heading to parent
  parent.appendChild(headingparent);

  // Loop for attach all need data for weather before and durring the trip
  for (let index = 1; index <= total; index++) {
    // create div to hold element for every day
    const div = document.createElement("div");

    // create paragraphs for date, high and low temperature provide from weatherbit API
    const paragraphDate = document.createElement("p");
    const paragraphHigh = document.createElement("p");
    const paragraphLow = document.createElement("p");

    // add text to paragraphs
    paragraphDate.innerHTML = data[index].datetime;
    paragraphHigh.innerHTML = `${data[index].high_temp} \xB0C.`;
    paragraphLow.innerHTML = `${data[index].low_temp}\xB0C.`;

    // set id to every paragraph
    paragraphDate.setAttribute("id", `date-${data[index].datetime}`);
    paragraphHigh.setAttribute("id", `high-${data[index].datetime}`);
    paragraphLow.setAttribute("id", `low-${data[index].datetime}`);

    // append every paragrap to div which separate days
    div.appendChild(paragraphDate);
    div.appendChild(paragraphHigh);
    div.appendChild(paragraphLow);

    // append every div holder to parent div
    parent.appendChild(div);
  }
};

// export function
export { updateUI };
