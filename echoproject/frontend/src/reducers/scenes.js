import { GET_SCENES, UPDATE_SCENE_ACTIVATE, UPDATE_SCENE_DEACTIVATE } from "../actions/types.js";

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
/*
    case UPDATE_SCENE_ACTIVATE:
      return {
        ...state,
        scene: action.payload
      };
       
    case UPDATE_SCENE_DEACTIVATE:
      return {
        ...state,
        scene: action.payload
      };
*/ 
    case UPDATE_SCENE_ACTIVATE: {
      const scenes = state.scenes.map(slist => {
          if (slist.id === action.payload.id) {
   
              console.log("inside UPDATE_SCENE_ACTIVATE");
              console.log("action.payload.id:" + action.payload.id);
              console.log("action.payload.active:" + action.payload.active);
              console.log("action.payload:" + JSON.stringify(action.payload) );
 
              return {
              id: action.payload.id,
              name: action.payload.name,
              img_default_url: action.payload.img_default_url,  
              img: action.payload.img,
              video_default_url: action.payload.video_default_url,
              video: action.payload.video,
              scene_type: action.payload.scene_type,
              desc1: action.payload.desc1,
              desc2: action.payload.desc2,
              option1: action.payload.option1,
              option2: action.payload.option2,
              active: action.payload.active,
              enabled: action.payload.enabled,      
               };
          } else {
              console.log("else inside UPDATE_SCENE_ACTIVATE");
              console.log("slist.id:" + slist.id);
              return slist;
          }
      });
  
      return { ...state, scenes };
    }

    case UPDATE_SCENE_DEACTIVATE: {
      const scenes = state.scenes.map(slist => {
          if (slist.id === action.payload.id) {
   
              console.log("inside UPDATE_SCENE_DEACTIVATE");
              console.log("action.payload.id:" + action.payload.id);
              console.log("action.payload.active:" + action.payload.active);
              console.log("action.payload:" + JSON.stringify(action.payload) );
 
              return {
              id: action.payload.id,
              name: action.payload.name,
              img_default_url: action.payload.img_default_url,  
              img: action.payload.img,
              video_default_url: action.payload.video_default_url,
              video: action.payload.video,
              scene_type: action.payload.scene_type,
              desc1: action.payload.desc1,
              desc2: action.payload.desc2,
              option1: action.payload.option1,
              option2: action.payload.option2,
              active: action.payload.active,
              enabled: action.payload.enabled,    
               };
          } else {
              console.log("else inside UPDATE_SCENE_DEACTIVATE");
              console.log("slist.id:" + slist.id);
              return slist;
          }
      });
  
      return { ...state, scenes };
    }
  
    default:
      return state;
  }
}


      
