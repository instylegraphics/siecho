import { GET_GAME_MAPS } from "../actions/types.js";

const initialState = {
  gamemaps: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAME_MAPS:
      return {
        ...state,
        gamemaps: action.payload
      };
    default:
      return state;
  }
}
