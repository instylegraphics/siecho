import { GET_GAME_MODES } from "../actions/types.js";

const initialState = {
  gamemodes: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAME_MODES:
      return {
        ...state,
        gamemodes: action.payload
      };
    default:
      return state;
  }
}
