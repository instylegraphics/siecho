import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactCountdownClock from "react-countdown-clock";
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';
import { withRouter } from 'react-router-dom'
import { getScene } from "../../actions/scenes";

export class CasterView extends Component {

  constructor(props) {
    super(props);
    this.state = {showImage: false};
    this.state = {sceneID: this.props.match.params.id};

  }
  
  
  showBackgroundImage = () => {
    this.setState({showImage: true});
  };
  
  hideBackgroundImage = () => {
    this.setState({showImage: false});
  }; 
 
    
  static propTypes = {
   getScene: PropTypes.func.isRequired
  };
    
  componentDidMount() {
    this.props.getScene(this.props.match.params.id);
    
  //console.log(this.props);
  //console.log(this.props.match.params.id);
   /*
        this.timer = setIntervalAsync( 
          async () => {
           console.log('showBackgroundImage start');
           this.showBackgroundImage },2500
        );
*/
  }
 
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate LOAD" );
    console.log("prevProps:" + JSON.stringify( prevProps ) );
    console.log("prevState:" + JSON.stringify( prevState ) );
    console.log("prevProps.match.params.id:" + prevProps.match.params.id );   
    console.log("prevState.sceneID:" + prevState.sceneID );      
    
    if (prevProps.match.params.id !== prevState.sceneID) {
        this.setState({sceneID: this.props.match.params.id} );
        this.props.getScene(this.props.match.params.id);
        console.log("componentDidUpdate RUNNNNN" );
    }
    
  }
     
  componentWillUnmount() {
/*
    clearIntervalAsync(this.timer);
    this.timer = null;

    console.log('showBackgroundImage end');
*/
  };


           
  render() {
    const showImage = this.state.showImage;
    const sceneID = this.state.sceneID;
    
    console.log("sceneID:" + sceneID );       
        
    const scenecast = this.props.match.params.id;
    console.log("scenecast:" + scenecast );
    
    console.log("this.props:" + JSON.stringify(this.props) );
    console.log("this.props.match.params.id:" + this.props.match.params.id ); 
    
    switch ( scenecast ) {
      case '5':     
        setTimeout( this.showBackgroundImage, 3000);
        return (
        <div className="scene" id={scenecast}>  
          <video id={scenecast} className="scene--video" playsinline="playsinline" autoplay="true" controls="true" >
              <source src="./static/videos/TFLArmajet_Transition.webm" type="video/webm"></source>
          </video>
          { showImage ? 
          <div>
          <img id="imgview" className="scene--image" src={'./static/img/scenes/starting.jpg'} alt="Scene"></img>
          <div className="container h-100">
            <div className="d-flex h-100 text-center align-items-center">
              <div id="text" className="scene--content__startingText">
                   <h1>ENJOY THE GAME</h1>
              </div>
            </div>
          </div>
          </div>
          :
          <p></p>
          }
        </div>
        );
      case '2':      
        setTimeout( this.showBackgroundImage, 3000);
        return (
        <div className="scene" id={scenecast}>  
          <video id={scenecast} className="scene--video" load preload="auto" playsinline="playsinline" autoplay="true" controls="true" >
              <source src="./static/videos/transition1.webm" type="video/webm"></source>
          </video>
          { showImage ? 
          <div>
          <img id="imgview" className="scene--image" src={'./static/img/scenes/starting-soon.jpg'} alt="Scene"></img>
          <div className="container h-100">
            <div className="d-flex h-100 text-center align-items-center">
              <div id="countdown" className="scene--content__timer10min">
                  <ReactCountdownClock seconds={600}
                     color="#e00e11"
                     alpha={1.0}
                     size={300}
                     onComplete={ console.log('done 10 min timer')} />
              </div>
            </div>
          </div>
          </div>
          :
          <p></p>
          }
        </div>
        );        
      case '4':
        setTimeout( this.showBackgroundImage, 3000);
        return (
        <div className="scene" id={scenecast}>  
          <video id={scenecast} className="scene--video" load preload="auto" playsinline="playsinline" autoplay="true" controls="true" >
              <source src="./static/videos/transition2.webm" type="video/webm"></source>
          </video>
          { showImage ? 
          <div>
          <img id="imgview" className="scene--image" src={'./static/img/scenes/brb.jpg'} alt="Scene"></img>
          <div className="container h-100">
            <div className="d-flex h-100 text-center align-items-center">
              <div id="countdown" className="scene--content__timer5min">
                  <ReactCountdownClock seconds={300}
                     color="#e00e11"
                     alpha={1.0}
                     size={300}
                     onComplete={ console.log('done 5 min timer')} />
              </div>
            </div>
          </div>
          </div>
          :
          <p></p>
          }
          
        </div>
        );
      case '1':
        return (
         <div><h1>case 1</h1></div>
        );        
      default:
        return (
         <div><h1>default case</h1></div>
        );
    }
    
    
  }
}

const mapStateToProps = state => ({
  scene: state.scene.scene
});

export default withRouter( connect( mapStateToProps,{ getScene } )(CasterView));