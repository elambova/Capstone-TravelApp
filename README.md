# TravelApp

This is final project for my learning in Udacity Front End Developer Nanodegree Program.

## Introduction

In this project are used:

- HTML
- CSS/SASS
- VanillaJS
- NodeJS
- ExpressJS
- Webpack
- Service workers
- JestJS
- Supertest

### Getting started

To view and test the project need to download in .zip format or clone it repository.
The next step is to navigate (in the terminal) to the corresponding directory in which it is located and install depedencies with

```
npm install
```

For the result to be obtained there must be credentials for the APIS used in the project:

- **USERNAME** for [Geonames API](https://www.geonames.org/export/),
- **API_KEY** for [Weatherbit API](https://www.weatherbit.io/),
- **API_KEY** for [Pixabay API](https://pixabay.com/api/docs/).

They have saved in `.env` file with:

- GEO_USERNAME for Geonames API,
- WEATHERBIT_API_KEY for Weather API,
- PIXABAY_API_KEY for Pixabay API.

The next step is to execute the following commands:

- for development: before we go into development, we need to run production to create the dist folder

```
npm run build
npm run dev
```

- for production:

```
npm run build
```

In a new terminal tab (in the same directory) run server with:

```
npm start
```

### Extends

The following extend have been implemented:

- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Incorporate icons into forecast.
