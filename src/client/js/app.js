"use strict";

const city = document.getElementById("city");
const dateStart = document.getElementById("date-start");
const dateEnd = document.getElementById("date-end");

const localhost = "http://localhost:8081/";

// destinationInfo function collect functions above starting from getData and wiht Promises (and key word then) add postData i updateUI.
function destinationInfo() {
  // loading image
  document.getElementById("loading").style.display = "block";

  fetch(
    `${localhost}getInfo?city=${city.value}&start=${dateStart.value}&end=${dateEnd.value}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      Client.updateUI(data);
    })
    .catch((err) => console.error(err));
}

export { destinationInfo };
