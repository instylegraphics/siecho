import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SCENES, UPDATE_SCENE_ACTIVATE, UPDATE_SCENE_DEACTIVATE } from "./types";

// GET SCENES
export const getScenes = () => (dispatch, getState) => {
  axios
    .get("/si/scene/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SCENES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE_SCENE_ACTIVATE
export const updateSceneActivate = ( scene, scenes ) => (dispatch, getState) => {

  console.log("inside updateSceneActivate func");
  console.log("scene id:" + scene.id );
  console.log("scene active:" + scene.active );
  var dataScene = JSON.stringify( scene ); 
  console.log("scene:" + dataScene);
  var dataScenes = JSON.stringify( scenes ); 
  console.log("scenes:" + dataScenes);
  // Using Object.keys() method to get length 
   var objectLenght = Object.keys(scenes).length;
   console.log("objectLenght:" + objectLenght);
            
  const objScene = {
    id: scene.id,
    name: scene.name, 
    img: scene.img,
    video: scene.video, 
    title: scene.title,
    desc1: scene.desc1, 
    desc2: scene.desc2,
    desc3: scene.desc3, 
    active: 'true',
    enabled: scene.enabled
  };
  
  //var dataScene2 = JSON.stringify( objScene ); 
  //console.log("objScene:" + dataScene2);
          
  axios
    .put("/si/scene/" + scene.id + "/", objScene, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateSceneActivate: "Scene Activated" }));
      dispatch({
        type: UPDATE_SCENE_ACTIVATE,
        payload: res.data
      });
    console.log("Scene Activated");

      // UPDATE REST OF SCENES, SET TO ACTIVE TO FALSE
      console.log("UPDATE SCENES SET ACTIVE");
      console.log("res.data:" + JSON.stringify( res.data ));
      console.log("res.data.ID:" + res.data.id);

    for (let [key, value] of Object.entries(scenes)) {
      console.log(key + ' = ' + JSON.stringify(value) );
      console.log('id = ' + value.id );
      console.log('name = ' + value.name );
      
      //&& value.active == 'true'
      if ( value.id != res.data.id  ) { 
        console.log('inside = ' + value.name );
        // POST
        const objScene = {
          id: value.id,
          name: value.name, 
          img: value.img,
          video: value.video, 
          title: value.title,
          desc1: value.desc1, 
          desc2: value.desc2,
          desc3: value.desc3, 
          active: 'false',
          enabled: value.enabled
        };
        
        axios
          .put("/si/scene/" + value.id + "/", objScene, tokenConfig(getState))
          .then(res => {
                // post scene
                dispatch(createMessage({ updateSceneActivate: "Other Scenes Deactivated" }));
                dispatch({
                type: UPDATE_SCENE_ACTIVATE,
                payload: res.data
                });
                console.log("success scene update" + value.id);
                console.log("res.data:" + JSON.stringify( res.data ));                
          })
          .catch(err => console.log(err));
          
        }//if 

      }// for loop
    
   
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
   
};

// UPDATE_SCENE_DEACTIVATE
export const updateSceneDeActivate = ( scene ) => (dispatch, getState) => {

  console.log("inside updateSceneDeActivate func");
  console.log("scene id:" + scene.id );
  console.log("scene active:" + scene.active );
  var dataScene = JSON.stringify( scene ); 
  console.log("scene:" + dataScene);
  
  const objScene = {
    id: scene.id,
    name: scene.name, 
    img: scene.img,
    video: scene.video, 
    title: scene.title,
    desc1: scene.desc1, 
    desc2: scene.desc2,
    desc3: scene.desc3, 
    active: 'false',
    enabled: scene.enabled
  };
  
  var dataScene2 = JSON.stringify( objScene ); 
  console.log("objScene:" + dataScene2 );
  
  axios
    .put("/si/scene/" + scene.id + "/", objScene, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateSceneDeActivate: "Scene De-Activated" }));
      dispatch({
        type: UPDATE_SCENE_DEACTIVATE,
        payload: res.data
      });
    console.log("Scene Deactivated");
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};