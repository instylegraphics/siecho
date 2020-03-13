import { combineReducers } from "redux";
import leads from "./leads";
import series from "./series";
import tournaments from "./tournaments"
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  leads,
  series,
  tournaments,
  errors,
  messages,
  auth
});
