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

// Add event listener to form travel. When button is clicked callback function destinationInfo will execute
document.getElementById("travel").addEventListener("submit", (e) => {
  e.preventDefault();
  destinationInfo();
});

// export js files
export { destinationInfo, updateUI };
