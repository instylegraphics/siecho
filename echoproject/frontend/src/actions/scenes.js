import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SCENES } from "./types";

// GET SCENES
export const getScenes = () => (dispatch, getState) => {
  axios
    .get("/si/scene/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SCENES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};