import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class CasterView extends Component {

  static propTypes = {
 
  };
    
  componentDidMount() {
    function setTimer( timeinminutes ){        
      var setminutes = 60 * timeinminutes;
      var display = document.querySelector('#timer');
      startTimer(setminutes, display);
    }
    
    setInterval( setTimer( 5 ), 3000);
    console.log("timer");
  }
    

  render() {
    //const { tournament, name, series_order, team_one, team_two, best_of } = this.state;

/*   
    document.getElementById("imgview").style.display = 'none';
    document.getElementById("countdown").style.display = 'none';
             
    var hidden = false;
    setInterval(function(){
    document.getElementById("imgview").style.display = "none" ? "block" : "none";
    document.getElementById("countdown").style.display = "none" ? "block" : "none";
    hidden = !hidden;}, 2700);
      

*/    
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Caster Live</h2>
  
        <div className="scene">  
          <video id="videomain" className="scene--video" playsinline="playsinline" autoplay="true" controls="true" poster="./static/img/scenes/brb.jpg" >
              <source src={ './static/videos/TFLArmajet_Transition.webm' } type="video/webm"></source>
          </video>
          <img id="imgview" className="scene--image" src={'./static/img/scenes/brb.jpg'} alt="Scene Desk"></img>
          <div className="container h-100">
            <div className="d-flex h-100 text-center align-items-center">
              <div id="countdown" className="scene--content">
                <h1>COUNTDOWN</h1>
                <h1><span id="timer"></span> minutes!</h1>
              </div>
            </div>
          </div>
        </div> 

  
      </div>
    );
  }
}

const mapStateToProps = state => ({
//  tournaments: state.tournaments.tournaments,
//  teams: state.teams.teams
});

export default connect( mapStateToProps,{  } )(CasterView);