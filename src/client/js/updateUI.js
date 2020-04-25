// updateUI function using the keyword async and updates the allData we have, and attach to selected elements
const updateUI = async () => {
  const req = await fetch("http://localhost:8081/all");
  try {
    const response = await req.json();
    const data = response[response.length - 1];

    document.getElementById("loading").style.display = "none";
    document.querySelector(".box").style.display = "flex";
    // document.getElementById("add-destination").style.display = "block";

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

    //This adds the name  to the results span
    document.getElementById("city-result").innerHTML = data.city;

    //This adds the name  to the results span
    document.getElementById("country").innerHTML = data.country;

    //This adds the temp to the results span
    document.getElementById("long").innerHTML = data.long;

    // This is adding the result data to the span
    document.getElementById("lat").innerHTML = data.lat;

    // This is adding the result data to the span
    document.getElementById("high-temp").innerHTML = data.high_temp + " \xB0C.";

    // This is adding the result data to the span
    document.getElementById("low-temp").innerHTML = data.low_temp + " \xB0C.";

    // This is adding the result data to the span
    document
      .getElementById("forecast-icon")
      .setAttribute(
        "src",
        `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`
      );

    document
      .getElementById("forecast-icon")
      .setAttribute("alt", `${data.weather.description}`);

    // This is adding the result data to the span
    document.getElementById("forecast").innerHTML = data.weather.description;

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
  } catch (error) {
    return error;
  }
};

export { updateUI };
