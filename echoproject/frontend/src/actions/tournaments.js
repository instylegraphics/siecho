import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_TOURNAMENTS } from "./types";

// GET TOURNAMENTS
export const getTournaments = () => (dispatch, getState) => {
  axios
    .get("/si/tournament/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TOURNAMENTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};