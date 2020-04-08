import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SCENE, GET_SCENES, UPDATE_SCENE_ACTIVATE, UPDATE_SCENE_DEACTIVATE } from "./types";


// GEAT A SCENE 
export const getScene = id => (dispatch, getState) => {
  axios
    .get("/si/scene/" + id + "/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SCENE,
        payload: res.data
      });
 
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

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
    img_default_url: scene.img_default_url,
    img: scene.img,
    video_default_url: scene.video_default_url,
    video: scene.video,
    scene_type: scene.scene_type,
    desc1: scene.desc1, 
    desc2: scene.desc2,
    option1: scene.option1, 
    option2: scene.option2, 
    active: 'true',
    enabled: String(scene.enabled)
  };
  
  var dataScene2 = JSON.stringify( objScene ); 
  console.log("objScene:" + dataScene2);
          
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
          img_default_url: value.img_default_url,          
          img: value.img,
          video_default_url: value.video_default_url,          
          video: value.video, 
          scene_type: value.scene_type,
          desc1: value.desc1, 
          desc2: value.desc2,
          option1: value.option1, 
          option2: value.option2,  
          active: 'false',
          enabled: String(value.enabled)
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

/*
      console.log("axios form post");
      axios
        .get('/#/caster',{
          scene: 'Scene 1',
          type: 'type1'
      })
      .then(function (response) {
          console.log('response success:' + response);
      })
      .catch(function (error) {
          console.log('response error:' + error);
      });
      console.log("axios form post after");
*/       
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
    img_default_url: scene.img_default_url,
    img: scene.img,
    video_default_url: scene.video_default_url,
    video: scene.video,
    scene_type: scene.scene_type,    
    desc1: scene.desc1, 
    desc2: scene.desc2,
    option1: scene.option1, 
    option2: scene.option2, 
    active: 'false',
    enabled: String(scene.enabled)
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