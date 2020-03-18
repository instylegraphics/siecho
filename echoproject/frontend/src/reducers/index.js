import { combineReducers } from "redux";
import leads from "./leads";
import series from "./series";
import matches from "./matches";
import match from "./matches";
import tournaments from "./tournaments"
import teams from "./teams"
import gamemaps from "./gamemaps"
import gamemodes from "./gamemodes"
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  leads,
  series,
  matches,
  match,
  tournaments,
  teams,
  gamemaps,
  gamemodes,
  errors,
  messages,
  auth
});
