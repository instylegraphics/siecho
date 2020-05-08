import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_PLAYERS } from "./types";

// GET_PLAYERS
export const getPlayers = () => (dispatch, getState) => {
  axios
    .get("/si/player/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PLAYERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};