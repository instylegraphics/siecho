import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactCountdownClock from "react-countdown-clock";
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';

export class CasterView extends Component {

  constructor(props) {
    super(props); 
    this.state = {showImage: false};
  }
  
  showBackgroundImage = () => {
    this.setState({showImage: true});
  };
  
  hideBackgroundImage = () => {
    this.setState({showImage: false});
  }; 
 
    
  static propTypes = {
 
  };
    
  componentDidMount() {
   /*
        this.timer = setIntervalAsync( 
          async () => {
           console.log('showBackgroundImage start');
           this.showBackgroundImage },2500
        );
*/     
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
    
    //const { tournament, name, series_order, team_one, team_two, best_of } = this.state;


    const step = null;
  

    switch (step) {
      case 1:
        return (
         <div><p>case 1</p></div>
        );
      case 2:
        return (
           <div><p>case 1</p></div>
        );
      default :
        //console.log("timer");
        //setInterval( this.showBackgroundImage, 3000);
        //this.timer = setIntervalAsync( this.showBackgroundImage, 2500);
        setTimeout( this.showBackgroundImage, 3000);

        return (
        <div className="scene">  
          <video id="videomain" className="scene--video" playsinline="playsinline" autoplay="true" controls="true" poster="./static/img/scenes/brb.jpg" >
              <source src={ './static/videos/TFLArmajet_Transition.webm' } type="video/webm"></source>
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
                     />
              </div>
            </div>
          </div>
          </div>
          :
          <p></p>
          }
          
        </div>
        );
    }
    
    
  }
}

const mapStateToProps = state => ({
//  tournaments: state.tournaments.tournaments,
//  teams: state.teams.teams
});

export default connect( mapStateToProps,{  } )(CasterView);