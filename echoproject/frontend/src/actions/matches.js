import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_MATCHES } from "./types";

// GET TOURNAMENTS
export const getMatches = () => (dispatch, getState) => {
  axios
    .get("/si/matchget", tokenConfig(getState))
    .then(res => {
        
      dispatch({
        type: GET_MATCHES,
        payload: res.data
      });
      console.log("data inside matches:");
      console.log(res.data);
    })

    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};