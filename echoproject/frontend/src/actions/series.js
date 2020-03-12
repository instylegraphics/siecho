import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SERIES, DELETE_SERIES, ADD_SERIES } from "./types";

// GET SERIES
export const getSeries = () => (dispatch, getState) => {
  axios
    .get("/si/series/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SERIES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE SERIES
export const deleteSeries = id => (dispatch, getState) => {
  axios
    .delete(`/si/series/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteSeries: "Series Deleted" }));
      dispatch({
        type: DELETE_SERIES,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD SERIES
export const addSeries = series => (dispatch, getState) => {
  axios
    .post("/si/series/", series, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addSeries: "Series Added" }));
      dispatch({
        type: ADD_SERIES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
