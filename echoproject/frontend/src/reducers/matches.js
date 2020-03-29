import { GET_MATCHES_DETAILS, GET_MATCHES, GET_MATCH, UPDATE_MATCH } from "../actions/types.js";

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
    default:
      return state;
  }
}
