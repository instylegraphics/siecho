import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SERIES, DELETE_SERIES, ADD_SERIES, ADD_MATCHES } from "./types";

// GET SERIES with optional Tourname ID param which returns only selected series with tournament id passed
export const getSeries = id => (dispatch, getState) => {
  axios
    .get("/si/series/", tokenConfig(getState))
    .then(res => {
    //console.log('get tid from series props');
    //console.log({id});
    console.log("prop tournament id:"+ id);
 
    var dataSeries = JSON.stringify(res.data); 
    dataSeries = JSON.parse(dataSeries);    
    console.log("return all series records");
    console.log(dataSeries);

    Array.prototype.removeVal = function(name, value){
    var array = $.map(this, function(v,i){
      return v[name] !== value ? null : v;
    });
    this.length = 0; 
    this.push.apply(this, array); //push all elements except the one we want to delete
    }
    //run exclusion
    if (id !== null) {    
      dataSeries.removeVal('tournament', parseInt(id) );
    }
    console.log("series records results AFTER deletion");    
    console.log(dataSeries);
    
      dispatch({
        type: GET_SERIES,
        payload: dataSeries
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
      dispatch(createMessage({ addSeries: "Series & Matches Added" }));
      dispatch({
        type: ADD_SERIES,
        payload: res.data
      });
      // ADD MATCHES Base on Best Of
      console.log(res.data);
      console.log(res.data.best_of);
      console.log(res.data.id);
      for (var i = 1; i <= res.data.best_of; i++){
        //console.log("loop - best of:" + i);
        //console.log("series id:" + res.data.id);
        //console.log("match_order:" + i);
        //console.log("series id:" + res.data.team_one);
        //console.log("series id:" + res.data.team_two);

        // POST
        const matchData = {
          match_order: i,
          series: res.data.id,
          team_one: res.data.team_one,
          team_two: res.data.team_two
        }
      
        axios.post('/si/match/', matchData, tokenConfig(getState))
         .then(res => {
              // post matching
              dispatch({ type: ADD_MATCHES });   
              console.log("success add match" + i);
              console.log(res.data);
         })
         .catch(err => console.log(err));

      }// for loop
      

    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
