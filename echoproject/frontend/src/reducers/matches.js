import { GET_MATCHES } from "../actions/types.js";

const initialState = {
  matches: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MATCHES:
      return {
        ...state,
        series: action.payload
      };
    default:
      return state;
  }
}
