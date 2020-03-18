import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_GAME_MAPS } from "./types";

// GET GAME MAPS
export const getGameMaps = () => (dispatch, getState) => {
  axios
    .get("/si/gamemap/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_GAME_MAPS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};