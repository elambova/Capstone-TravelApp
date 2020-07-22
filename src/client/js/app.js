"use strict";

const city = document.getElementById("city");
const dateStart = document.getElementById("date-start");
const dateEnd = document.getElementById("date-end");

let destinationsArray = localStorage.getItem("destination")
  ? JSON.parse(localStorage.getItem("destination"))
  : [];

localStorage.setItem("destination", JSON.stringify(destinationsArray));

const dataStorage = JSON.parse(localStorage.getItem("destination"));

const localhost = "http://localhost:8081/";

// postData function using the keyword async and use method POST to post data which we will need later
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    return error;
  }
};

function destinationInfo() {
  // loading image
  document.getElementById("loading").style.display = "block";

  if (city.value.trim().length !== 0) {
    city.hasAttribute("class") ? city.removeAttribute("class") : null;
    fetch(
      `${localhost}getInfo?city=${city.value}&start=${dateStart.value}&end=${dateEnd.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Client.updateUI(data);
      })
      .catch((err) => console.error(err));
  } else {
    city.classList.add("error");
    return;
  }
}

// destinationSave function collect functions above starting from getData and wiht Promises (and key word then) add postData and updateUI.
function destinationSave() {
  // loading image
  document.getElementById("loading").style.display = "block";
  if (dataStorage.length > 0) {
    fetch(
      `${localhost}getInfo?city=${city.value}&start=${dateStart.value}&end=${dateEnd.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        postData(`${localhost}saveData`, data);
        city.value = dataStorage[0].city;
        dateStart.value = dataStorage[0].start;
        dateEnd.value = dataStorage[0].end;
        Client.updateUI(dataStorage);
      })
      .catch((err) => console.error(err));
  } else {
    if (city.value.trim().length !== 0) {
      city.hasAttribute("class") ? city.removeAttribute("class") : null;
      fetch(
        `${localhost}getInfo?city=${city.value}&start=${dateStart.value}&end=${dateEnd.value}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          postData(`${localhost}saveData`, data);
          destinationsArray.push(data);
          localStorage.setItem(
            "destination",
            JSON.stringify(destinationsArray)
          );
          Client.updateUI(data);
        })
        .catch((err) => console.error(err));
    } else {
      city.classList.add("error");
      return;
    }
  }
}

export { destinationInfo, destinationSave };
