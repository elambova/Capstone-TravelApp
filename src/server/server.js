var path = require("path");
const dotenv = require("dotenv");
dotenv.config();

/* Empty JS object to act as endpoint for all routes */
let projectData = [];

const express = require("express");

const app = express();

//bodyParser middleware
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.static("dist"));

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// const async = require("express-async-await");
const fetch = require("node-fetch");

app.get("/", function (req, res) {
  // for production
  // res.sendFile("dist/index.html");

  // for development
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
const port = 8081;

// Spin up th server
app.listen(port, listening);

// Callback function for listen, initialize in console that the server is running and the contents of localhost:8080
function listening() {
  console.log(`Server is running on localhost:${port}`);
}

// Keys for access to APIs
const keys = {
  geoUserName: process.env.GEO_USERNAME,
  weatherKey: process.env.WEATHERBIT_API_KEY,
  pixabayKey: process.env.PIXABAY_API_KEY,
};

// Connect to Geonames Api
const geonamesApiConnect = async (city) => {
  const location = await fetch(
    `http://api.geonames.org/searchJSON?q=${city}&username=${keys.geoUserName}`
  );
  try {
    const dataLocation = await location.json();
    return dataLocation.geonames[0];
  } catch (error) {
    console.log(error);
  }
};

// Connect to Weather Api
const weatherApiConnect = async (lat, lng) => {
  const weather = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${keys.weatherKey}`
  );

  try {
    const weatherData = await weather.json();
    return weatherData.data[weatherData.data.length - 1];
  } catch (error) {
    console.log(error);
  }
};

// Connect to Pixabay Api
const pixabayApiConnect = async (city, country) => {
  let pixabay =
    city === undefined
      ? await fetch(
          `https://pixabay.com/api/?key=${keys.pixabayKey}&q=${country}&image_type=photo&pretty=true`
        )
      : await fetch(
          `https://pixabay.com/api/?key=${keys.pixabayKey}&q=${city}+${country}&image_type=photo&pretty=true`
        );

  try {
    const pixabayData = await pixabay.json();
    return pixabayData;
  } catch (error) {
    console.log(error);
  }
};

// Calculates the days between the current day and departure day, and how long the trip will be
const travelDate = (start, end) => {
  // Create a new date instance dynamically with JS
  let d = new Date();
  let currentDate =
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

  function toNumber(date) {
    return Number(new Date(date).getTime());
  }

  // To calculate the time difference of two dates
  const differenceInTime = toNumber(start) - toNumber(currentDate);

  // To calculate the time difference of two dates
  const differenceInVacation = toNumber(end) - toNumber(start);

  // To calculate the no. of days between two dates
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  // To calculate the no. of days between two dates
  const differenceInVacationInDays = differenceInVacation / (1000 * 3600 * 24);

  const result = {
    daysUntilTrip: differenceInDays.toFixed(0),
    tripLength: differenceInVacationInDays,
  };

  return result;
};

app.get("/getInfo", async (req, res, next) => {
  try {
    const geonames = await geonamesApiConnect(req.query.city);
    const weather = await weatherApiConnect(geonames.lat, geonames.lng);
    const pixabay = await pixabayApiConnect(
      req.query.city,
      geonames.countryName
    );

    const data = {
      city: geonames.name,
      lat: geonames.lat,
      long: geonames.lng,
      country: geonames.countryName,
      daysUntilTrip: travelDate(req.query.start, req.query.end).daysUntilTrip,
      tripLength: travelDate(req.query.start, req.query.end).tripLength,
      start: req.query.start,
      end: req.query.end,
      picture: pixabay.hits[0].webformatURL,
      tags: pixabay.hits[0].tags,
    };

    // projectData.push({ ...data, ...weather });
    res.send({ ...data, ...weather });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
