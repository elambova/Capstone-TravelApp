// import js files
import { destinationInfo } from "./js/app";
import { updateUI } from "./js/updateUI";

// import css/scss files
import "./styles/reset.scss";
import "./styles/style.scss";

// Add event listener to form travel. When button is clicked callback function destinationInfo will execute
document.getElementById("travel").addEventListener("submit", (e) => {
  e.preventDefault();
  destinationInfo();
});

// Add event listener to button add-destination. When button is clicked callback function destinationInfo will execute
// document.getElementById("add-destination").addEventListener("click", addTravel);

// export js files
export { destinationInfo, updateUI };
