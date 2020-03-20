import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_GAME_FACTIONS } from "./types";

// GET GAME FACTIONS
export const getGameFactions = () => (dispatch, getState) => {
  axios
    .get("/si/gamefaction/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_GAME_FACTIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};