import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_MATCHES, UPDATE_MATCHES } from "./types";

 
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

// UPDATE MATCH SERIES
export const updateMatches = matches => (dispatch, getState) => {
  axios
    .post("/si/match/", matches, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateMatches: "Match Updated" }));
      dispatch({
        type: UDPATE_MATCHES,
        payload: res.data
      });
 
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};