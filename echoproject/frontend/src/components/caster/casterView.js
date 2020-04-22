import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactCountdownClock from "react-countdown-clock";
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';
import { withRouter } from 'react-router-dom'
import { getScene } from "../../actions/scenes";
import FadeAnimation  from "react-fade-animation";
import socketIOClient from "socket.io-client";

export class CasterView extends Component {

  constructor(props) {
    super(props);
    this.state = {showImage: false};
//    this.state = {sceneid: this.props.match.params.id};
    this.videoRef = React.createRef(); // create react ref
    this.contentRef = React.createRef(); // create react ref
    this.timer = null;
    this.state= { sceneid: null};
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
    //this.props.getScene(this.props.match.params.id);
     
    console.log("componentDidMount LOAD" );
    
    if ( this.videoRef.current ) {
        console.log('componentDidUpdate reload video');
        this.videoRef.current.play();
    }
    
    const socket = socketIOClient("http://192.241.146.171:4001");
    socket.on('change scene', (scene) => {
        this.setState({sceneid: scene});
        this.props.getScene( scene );
        console.log("socket: change scene:" + scene );
        
        this.hideBackgroundImage;
        if ( this.videoRef.current ) {
        console.log('componentDidUpdate reload video');
        this.videoRef.current.play();
        }
    })
      
        
//    console.log("this.props:" + JSON.stringify(this.props) );
//    console.log("this.props.match.params.id:" + this.props.match.params.id ); 
//    console.log("this.videoRef LOAD"  );
    //this.videoRef.current.play();
    
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

/* 
    console.log("prevProps:" + JSON.stringify( prevProps ) );
    console.log("prevState:" + JSON.stringify( prevState ) );

    console.log("prevProps.match.params.id:" + prevProps.match.params.id );   
    console.log("prevState.sceneid:" + prevState.sceneid );      
*/   

//    console.log("componentDidUpdate LOAD" );
/*
    if (prevProps.match.params.id !== prevState.sceneid) {
        this.setState({sceneid: this.props.match.params.id} );
        this.props.getScene(this.props.match.params.id);
 //       console.log("componentDidUpdate RUNNNNN" );
        
        this.hideBackgroundImage;
        //clearTimeout(this.timer);
        //this.timer = null;
        if ( this.videoRef.current ) {
        console.log('componentDidUpdate reload video');
        this.videoRef.current.play();
        }
        
        
    }
*/    
  }


     
  componentWillUnmount() {
//   console.log("componentWillUnmount LOAD" );
   this.hideBackgroundImage;
   clearTimeout(this.timer);
   this.timer = null;
  
/*
    clearIntervalAsync(this.timer);
    this.timer = null;

    console.log('showBackgroundImage end');
*/
  };

       
  render() {
    const showImage = this.state.showImage;
    const sceneid = this.state.sceneid;
    const scene_type = this.props.scene.scene_type;    
    const url_vid = this.props.scene.video_default_url;
    const url_img = this.props.scene.img_default_url;
    const scene_name = this.props.scene.name;
    const scene_desc1 = this.props.scene.desc1;
    const scene_desc2 = this.props.scene.desc2;
    const scene_option1 = this.props.scene.option1;
    const scene_option2 = this.props.scene.option2;
    
/*         
    console.log("sceneid:" + sceneid );       
    console.log("showImage:" + showImage );  
    console.log("url_vid:" + url_vid );       
    console.log("url_img:" + url_img );  
    console.log("scene_name:" + scene_name );       
    console.log("scene_desc1:" + scene_desc1 );  
    console.log("scene_desc2:" + scene_desc2 ); 
    console.log("scene_type:" + scene_type );       
    console.log("scene_option1:" + scene_option1 ); 
    console.log("scene_option2:" + scene_option2 );                 
*/ 
//    const scenecast = this.props.match.params.id;
//    const node = this.videoRef.current;
    //node.load();
    // this.hideBackgroundImage;
     
     
    switch ( scene_type ) {
      case 'countdown':
/*      
        if ( this.videoRef.current ) {
        console.log('videoRef here');
        //this.videoRef.current.play();
        }
        
        if ( this.contentRef.current ) {
          console.log('contentRef here');
          //this.contentRef.current.style.display = 'none';
          //this.timer=setTimeout( this.contentRef.contentRef.style.display = 'block', 3000);
         // $(this.contentRef.contentRef).hide();
          //this.timer=setTimeout( $(this.contentRef.contentRef).show(), 3000);
        }
*/        
        this.hideBackgroundImage;
        //setTimeout( this.showBackgroundImage, 3000);
        this.timer=setTimeout( this.showBackgroundImage, 3000);
        
        return (
        <div className="scene">  
          <video id={sceneid} ref={this.videoRef} src={ url_vid } type="video/webm" className="scene--video" muted preload="auto" playsinline="playsinline" autoplay="true" ></video>
           

          <div id="showMex" ref={this.contentRef} >
          
          <img id="imgview" className={ showImage ? 'scene--image d-block' : 'scene--image d-none'} src={ url_img } alt={ scene_name } />
          
          <FadeAnimation from={"top"} selectAll={true} duration={3} startDistance={200}>
          <div className="container h-100" >
            <div className="d-flex h-100 text-center align-items-center">
              <div id="countdown" className={ scene_option2 }>
                  <ReactCountdownClock seconds={ scene_option1 }
                     color="#e00e11"
                     alpha={1.0}
                     size={ 300 } />
              </div>
            </div>
          </div>
          </FadeAnimation>
           
          </div>

        </div>
        
        ); 

      case 'background':
        this.hideBackgroundImage;
        //setTimeout( this.showBackgroundImage, 3000);
        this.timer=setTimeout( this.showBackgroundImage, 3000);
        return (
        <div className="scene">  
          <video id={sceneid} ref={this.videoRef} src={ url_vid } type="video/webm" className="scene--video" muted preload="auto" playsinline="playsinline" autoplay="true" ></video>
          
          <div id="showMex" ref={this.contentRef} >
            <img id="imgview" className={ showImage ? 'scene--image d-block' : 'scene--image d-none'} src={ url_img } alt={ scene_name } />
            
            <FadeAnimation from={"bottom"} selectAll={true} duration={ 3 } startDistance={200}>
            <div className="container h-100" >
              <div className="d-flex h-100 text-center align-items-center">
                <div id="text" className="scene--content__startingText">
                     <h1>{ scene_desc1 }</h1>
                     <p>{ scene_desc2}</p>
                </div>
              </div>
            </div>
            </FadeAnimation>
            
          </div>

        </div>
        );  
      case 'overlay':
        this.hideBackgroundImage;
        //setTimeout( this.showBackgroundImage, 3000);
        this.timer=setTimeout( this.showBackgroundImage, 3000);
        return (
        <div className="scene">  
          <video id={sceneid} ref={this.videoRef} src={ url_vid } type="video/webm" className="scene--video" muted preload="auto" playsinline="playsinline" autoplay="true" ></video>
          
          <div id="showMex" ref={this.contentRef} >
            <img id="imgview" className={ showImage ? 'scene--image d-block' : 'scene--image d-none'} src={ url_img } alt={ scene_name } />
          </div>
    
        </div>
        );
      case 'bracket':
        this.hideBackgroundImage;
        return (
         <div><h1>case bracket</h1></div>
        );
              
      default:
        this.hideBackgroundImage;
        this.timer=setTimeout( this.showBackgroundImage, 3000);
        return (
        <div className="scene">  
          <video id="1" ref={this.videoRef} src="./static/videos/TFLArmajet_Transition.webm" type="video/webm" className="scene--video" muted preload="auto" playsinline="playsinline" autoplay="true" ></video>
          
          <div id="showMex" ref={this.contentRef} >
            <img id="imgview" className={ showImage ? 'scene--image d-block' : 'scene--image d-none'} src="./static/img/scenes/starting.jpg" alt="SI" />
            
            <FadeAnimation from={"bottom"} selectAll={true} duration={ 3 } startDistance={ 0 }>
            <div className="container h-100" >
              <div className="d-flex h-100 text-center align-items-center">
                <div id="text" className="scene--content__defaultText">
                     <h1>Welcome to Stream Interactive</h1>
                     <p>We Stream You Scream for Broadcasting!</p>
                </div>
              </div>
            </div>
            </FadeAnimation>
            
          </div>

        </div>
        );
    }
    
    
  }
}

const mapStateToProps = state => ({
  scene: state.scene.scene
});

export default withRouter( connect( mapStateToProps,{ getScene } )(CasterView));