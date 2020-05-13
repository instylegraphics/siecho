import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_PLAYERSTATS, ADD_PLAYERSTATS, DELETE_PLAYERSTATS, UPDATE_PLAYERSTATS } from "./types";

// GET_PLAYERSTATS
export const getPlayerStats = () => (dispatch, getState) => {
  axios
    .get("/si/playerstats/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PLAYERSTATS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


// DELETE_PLAYERSTATS
export const deletePlayerStats = id => (dispatch, getState) => {
  axios
    .delete(`/si/playerstats/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deletePlayerStats: "Player Deleted in Match" }));
      dispatch({
        type: DELETE_PLAYERSTATS,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD_PLAYERSTATS
export const addPlayerStats = playerObj => (dispatch, getState) => {
  axios
    .post("/si/playerstats/", playerObj, tokenConfig(getState))
    .then(res => {  
      dispatch(createMessage({ addPlayerStats: "Player Added in Match" }));
      dispatch({
        type: ADD_PLAYERSTATS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// UPDATE_PLAYERSTATS  
export const updatePlayerStats = playerObjUpdate => (dispatch, getState) => {
  console.log("inside updatePlayerStats func");
  console.log('playerObjUpdate.id:' + playerObjUpdate.id );
  //console.log('playerObjUpdate:' + playerObjUpdate );
  console.log('playerObjUpdate:' + JSON.stringify(playerObjUpdate) );


  axios
    .put("/si/playerstats/" + playerObjUpdate.playerstatsid + "/", playerObjUpdate, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updatePlayerStats: "Updated Player Stats in Match" }));
      dispatch({
        type: UPDATE_PLAYERSTATS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));

};

