import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_TEAMS } from "./types";

// GET TOURNAMENTS
export const getTeams = () => (dispatch, getState) => {
  axios
    .get("/si/team/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TEAMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};