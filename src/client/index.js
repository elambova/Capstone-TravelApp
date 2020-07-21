// import js files
import { destinationInfo } from "./js/app";
import { updateUI } from "./js/updateUI";

// import css/scss files
import "./styles/reset.scss";
import "./styles/style.scss";

// import image/gif file
import loading from "./media/loading.gif";

// get image from html and set source
const loadingGif = document.getElementById("loading");
loadingGif.src = loading;

const printBtn = document.getElementById("print");
window.onload = () => {
  console.log(localStorage);
  if (localStorage.destination.length > 2) {
    printBtn.style.display = "block";
    destinationInfo();
  }
};

// Add event listener to form travel. When button is clicked callback function destinationInfo will execute
document.getElementById("travel").addEventListener("submit", (e) => {
  e.preventDefault();
  destinationInfo();
});

// export js files
export { destinationInfo, updateUI };
