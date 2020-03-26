import { GET_SCENES } from "../actions/types.js";

const initialState = {
  scenes: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SCENES:
      return {
        ...state,
        scenes: action.payload
      };
    default:
      return state;
  }
}
