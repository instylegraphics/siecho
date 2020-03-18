import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_GAME_MODES } from "./types";

// GET GAME MODES
export const getGameModes = () => (dispatch, getState) => {
  axios
    .get("/si/gamemode/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_GAME_MODES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};