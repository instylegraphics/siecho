import { GET_SERIES, DELETE_SERIES, ADD_SERIES, CLEAR_SERIES } from "../actions/types.js";

const initialState = {
  series: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SERIES:
      return {
        ...state,
        series: action.payload
      };
    case DELETE_SERIES:
      return {
        ...state,
        series: state.series.filter(lead => lead.id !== action.payload)
      };
    case ADD_SERIES:
      return {
        ...state,
        series: [...state.series, action.payload]
      };
    case CLEAR_SERIES:
      return {
        ...state,
        series: []
      };
    default:
      return state;
  }
}
