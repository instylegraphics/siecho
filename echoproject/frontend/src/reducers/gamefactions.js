import { GET_GAME_FACTIONS } from "../actions/types.js";

const initialState = {
  gamefactions: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAME_FACTIONS:
      return {
        ...state,
        gamefactions: action.payload
      };
    default:
      return state;
  }
}
