import { GET_PLAYERSTATS, ADD_PLAYERSTATS, DELETE_PLAYERSTATS, UPDATE_PLAYERSTATS } from "../actions/types.js";

const initialState = {
  playerstats: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PLAYERSTATS:
      return {
        ...state,
        playerstats: action.payload
      };
    case ADD_PLAYERSTATS:
      return {
        ...state,
        playerstats: [...state.playerstats, action.payload]
      };      
    case DELETE_PLAYERSTATS:
      return {
        ...state,
        playerstats: state.playerstats.filter(playerstats => playerstats.id !== action.payload)
      };
    case UPDATE_PLAYERSTATS: {
      const playerstats = state.playerstats.map(el => {
          if (el.id === action.payload.id) {
              console.log("inside UPDATE_PLAYERSTATS");
              console.log("action.payload.id:" + action.payload.id);
              console.log("action.payload:" + JSON.stringify(action.payload) );

              return {
              id: action.payload.id,
              is_captain: action.payload.is_captain,
              win: action.payload.win,
              loss: action.payload.loss,
              score: action.payload.score,
              kills: action.payload.kills,
              deaths: action.payload.deaths,
              assist: action.payload.assist,            
              goals: action.payload.goals,
              grabs: action.payload.grabs,
              drops: action.payload.drops,           
              match: action.payload.match,
              player: action.payload.player,
              team: action.payload.team,
              game: action.payload.game,             
              gamemode: action.payload.gamemode,
              gamemap: action.payload.gamemap,
              };
              //return { el, style };
          } else {
              console.log("else inside UPDATE_PLAYERSTATS");
              console.log("el.id:" + el.id);
              return el;
              
          }
      });
  
      return { ...state, playerstats };
    }               
    default:
      return state;
  }
}
