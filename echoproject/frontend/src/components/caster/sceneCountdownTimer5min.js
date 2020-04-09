import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getScene } from "../../actions/scenes";
import ReactCountdownClock from "react-countdown-clock";
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';

export class SceneCountdownTimer5min extends Component {

/* 
  constructor(props) {
    super(props);
    this.state = {showImage: false};

  }  
  
*/
  static propTypes = {
    getScene: PropTypes.array.isRequired   
  };
    
  componentDidMount() {
    this.props.getScene(this.props.sceneID);
    
  }
  render() {
    const { valueProps, handleChange } = this.props;
    console.log('scene 4 props');
    console.log(this.props);
    console.log('scene 4 valueProps this.valueProps.match.params.id');
    console.log(this.props.valueProps.match.params.id);
    console.log('sceneID');
    console.log( this.props.sceneID );
    console.log('showImage');
    console.log( this.props.showImage );
    
    const showImage = true;
    const sceneID = this.props.sceneID 
    return (
        
        <React.Fragment>
        <div className="card card-body mt-4 mb-4">
          <div className="scene">  
            <video key={sceneID} className="scene--video" load preload="auto" playsinline="playsinline" autoplay="true" controls="true" >
                <source src={ this.props.scene.video_default_url } type="video/webm"></source>
            </video>
            { showImage ? 
            <div>
            <img id="imgview" className="scene--image" src={ this.props.scene.img_default_url } alt="Scene"></img>
            <div className="container h-100">
              <div className="d-flex h-100 text-center align-items-center">
                <div id="countdown" className="scene--content__timer5min">
                    <ReactCountdownClock seconds={300}
                       color="#e00e11"
                       alpha={1.0}
                       size={300}
                       onComplete={ console.log('done 5 min timer')} />
                      
                </div>
                    <p>Scene Name: { this.props.scene.name}</p>
                    <p>Scene Desc: { this.props.scene.desc1}</p>
              </div>
            </div>
            </div>
            :
            <p></p>
            }
            
          </div>
        </div>
        </React.Fragment>
       
    );
  }
}

const mapStateToProps = state => ({
  scene: state.scene.scene,
});

export default connect( mapStateToProps,{ getScene } )(SceneCountdownTimer5min);
