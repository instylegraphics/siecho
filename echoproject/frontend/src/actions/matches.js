import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_MATCHES, GET_MATCH, UDPATE_MATCH } from "./types";

 
// GET MATCHES with optional series ID param which returns only selected matches with series id passed
export const getMatches = id => (dispatch, getState) => {
  axios
    .get("/si/matchget/", tokenConfig(getState))
    .then(res => {
    //console.log('get tid from series props');
    //console.log({id});
    console.log("prop series id:" + id);
 
    var dataSeries = JSON.stringify(res.data); 
    dataSeries = JSON.parse(dataSeries);    
    console.log("return all match records");
    console.log(dataSeries);

    Array.prototype.removeVal = function(name, value){
    var array = $.map(this, function(v,i){
      return v[name].id !== value ? null : v;
    });
    this.length = 0; 
    this.push.apply(this, array); //push all elements except the one we want to delete
    }
    //run exclusion
    if (id !== null) {    
      dataSeries.removeVal('series', parseInt(id) );
    }
    console.log("matches records results AFTER deletion");    
    console.log(dataSeries);
 
      dispatch({
        type: GET_MATCHES,
        payload: dataSeries
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GEAT A MATCH 
export const getMatch = id => (dispatch, getState) => {
  axios
    .get("/si/match/" + id + "/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MATCH,
        payload: res.data
      });
 
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE MATCH 
export const updateMatch = (match) => (dispatch, getState) => {

  console.log("inside updateMatch func");
  console.log("match values");
  console.log(match);
  axios
    .put("/si/match/" + match.matchid + "/", match, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateMatch: "Match Updated" }));
      dispatch({
        type: UDPATE_MATCH,
        payload: res.data
      });
    alert("Match Updated.");
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};