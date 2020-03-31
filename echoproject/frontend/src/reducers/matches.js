import { GET_MATCHES_DETAILS, GET_MATCHES, GET_MATCH, UPDATE_MATCH, UPDATE_MATCHES } from "../actions/types.js";

const initialState = {
  matchesdetails: [],
  matches: [],
  match: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MATCHES_DETAILS:
      return {
        ...state,
        matchesdetails: action.payload
      };    
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload
      };
    case GET_MATCH:
      return {
        ...state,
        match: action.payload
      };      

  case UPDATE_MATCH:
      return {
        ...state,
        match: action.payload
      };
    
  case UPDATE_MATCHES: {
      const matches = state.matches.map(mlist => {
          if (mlist.id === action.payload.id) {
              console.log("inside UPDATE_MATCHES");
              console.log("action.payload.id:" + action.payload.id);
              console.log("action.payload.active:" + action.payload.active);
              console.log("action.payload.ended:" + action.payload.ended);
              console.log("action.payload:" + JSON.stringify(action.payload) );
 
              return {
              id: action.payload.id,
              match_order: action.payload.match_order,
              roomcode: action.payload.roomcode,
              team_one_score: action.payload.team_one_score,
              team_two_score: action.payload.team_two_score,
              active: action.payload.active,
              ended: action.payload.ended,
              series: action.payload.series,
              gamemap: action.payload.gamemap,
              gamemode: action.payload.gamemode,
              team_one: action.payload.team_one,
              team_one_faction: action.payload.team_one_faction,
              team_two: action.payload.team_two,
              team_two_faction: action.payload.team_two_faction,
              winner: action.payload.winner           
               };
          } else {
              console.log("else inside UPDATE_MATCHES");
              console.log("mlist.id:" + mlist.id);
              return mlist;
          }
      });
  
      return { ...state, matches };
    }
    
    default:
      return state;
  }
}
