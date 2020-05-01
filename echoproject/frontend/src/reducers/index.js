import { combineReducers } from "redux";
import series from "./series";
import seriesdetails from "./series";
import matchesdetails from "./matches";
import matches from "./matches";
import match from "./matches";
import tournaments from "./tournaments"
import teams from "./teams"
import gamemaps from "./gamemaps"
import gamemodes from "./gamemodes"
import gamefactions from "./gamefactions"
import scene from "./scenes";
import scenes from "./scenes";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  series,
  seriesdetails,
  matchesdetails,
  matches,
  match,
  tournaments,
  teams,
  gamemaps,
  gamemodes,
  gamefactions,
  scene,
  scenes,
  errors,
  messages,
  auth
});
