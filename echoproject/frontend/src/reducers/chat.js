import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS, SET_USERNAME, UPDATE_CHAT_LOG} from "../actions/types.js";

const initialState = {
    room: null,
    chatLog: [],
    username: null
}

export default function (state = initialState, action) {
    switch(action.type){
        case CREATE_ROOM_SUCCESS:
        //    state.room = action.payload;
        //    break;                  
          return {
          ...state,
          room: action.payload
          };
        case JOIN_ROOM_SUCCESS:
        //    state.room = action.payload;
        //    break;
          return {
          ...state,
          room: action.payload
          };
        case SET_USERNAME:
        //    state.username = action.username;
        //    break;
          return {
          ...state,
          username: action.username
          };
        case UPDATE_CHAT_LOG:
        /*
            if(state.room !== null && action.update.roomId === state.room.id){
                state.chatLog = [...state.chatLog, action.update.data];
            }
            break;
        */
          return {
          ...state,
          chatLog: action.data
          //chatLog = [...state, chatLog: action.update.data];
          };                     
     default:
      return state;
  }
}