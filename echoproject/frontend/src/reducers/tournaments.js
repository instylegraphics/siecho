import { GET_TOURNAMENTS } from "../actions/types.js";

const initialState = {
  tournaments: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOURNAMENTS:
      return {
        ...state,
        tournaments: action.payload
      };
    default:
      return state;
  }
}
