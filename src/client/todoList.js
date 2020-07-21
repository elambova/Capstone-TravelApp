import "./styles/reset.scss";
import "./styles/style.scss";

import { listTrip } from "./js/listTrip";

listTrip(localStorage.getItem("destination"));

export { listTrip };
