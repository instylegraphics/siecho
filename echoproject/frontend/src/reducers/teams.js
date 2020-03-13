import { GET_TEAMS } from "../actions/types.js";

const initialState = {
  teams: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload
      };
    default:
      return state;
  }
}
