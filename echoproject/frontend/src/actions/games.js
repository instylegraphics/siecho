import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_GAMES } from "./types";

// GET TOURNAMENTS
export const getGames = () => (dispatch, getState) => {
  axios
    .get("/si/game/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_GAMES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};