import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatch, updateMatch } from "../../actions/matches";
import { getTeams} from "../../actions/teams";
import { getGameMaps } from "../../actions/gamemaps";
import { getGameModes } from "../../actions/gamemodes";
import { getGameFactions } from "../../actions/gamefactions";

export class StepFourMatchAdminForm extends Component {

  state = {
    matchData: [], 
    currentMatchData: { 
      roomcode: "",
      gamemode: "",
      gamemap: "",
      team_one_faction: "",
      team_one_score: "",
      team_two_faction: "",
      team_two_score: "",
      winner: ""
    }   
  };

 
  componentDidMount() {

    console.log("componentDidMount matchid:" + this.props.valueProps.match);
    this.props.getMatch(this.props.valueProps.match);
    console.log('componentDidMount this.props');
    console.log(this.props);
    console.log('componentDidMount this.props.match');    
    console.log(this.props.match);
    this.props.getTeams();
    this.props.getGameMaps();
    this.props.getGameModes();
    this.props.getGameFactions();
    
    const { matchData } = this.state;
    this.setState({ 
      matchData: this.props.match      
   });  
   
    //activate bs spinner
    //$("input[type='number']").inputSpinner();    
    
  }  

 
  //continue button function
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  //back button function
  back = e => {
    e.preventDefault();
    this.props.prevStep();
    
    //clear state
    this.setState({
        matchData: [] 
    });
    
  };
 
     
  //submit button function
  onSubmit = e => {
    e.preventDefault();
    console.log('inside match form');
    console.log('b4 submit this.props :');
    console.log(this.props);
    console.log('valueProps Form - match id :' + this.props.valueProps.match );
        
    console.log('b4 submit');
   
    // getting the form values - roomcode
    var s_roomcode = this.state.currentMatchData.roomcode;  
    console.log('this.state.currentMatchData.roomcode:' + s_roomcode);
         
    var jq_roomcode = $("#roomcode").val();  
    console.log('jquery roomcode:' + jq_roomcode);
    
    var f_roomcode = "";
    if (typeof s_roomcode != 'undefined' && s_roomcode) {
        f_roomcode = s_roomcode;
    } else {
        if (typeof jq_roomcode != 'undefined' && jq_roomcode) {
          f_roomcode = jq_roomcode;
        }
    } 
    console.log('f_roomcode:' + f_roomcode);
       
    // getting the form values - gamemode
    var s_gamemode = this.state.currentMatchData.gamemode;  
    console.log('this.state.currentMatchData.gamemode:' + s_gamemode);
         
    var jq_gamemode = $("#gamemode").val();  
    console.log('jq_gamemode:' + jq_gamemode);
    
    var f_gamemode = "";
    if (typeof s_gamemode != 'undefined' && s_gamemode) {
        f_gamemode = s_gamemode;
    } else {
        if (typeof jq_gamemode != 'undefined' && jq_gamemode) {
          f_gamemode = jq_gamemode;
        }
    } 
    console.log('f_gamemode:' + f_gamemode);     
 
    // getting the form values - gamemap
    var s_gamemap = this.state.currentMatchData.gamemap;  
    console.log('this.state.currentMatchData.gamemap:' + s_gamemap);
         
    var jq_gamemap = $("#gamemap").val();  
    console.log('jq_gamemap:' + jq_gamemap);
    
    var f_gamemap = "";
    if (typeof s_gamemap != 'undefined' && s_gamemap) {
        f_gamemap = s_gamemap;
    } else {
        if (typeof jq_gamemap != 'undefined' && jq_gamemap) {
          f_gamemap = jq_gamemap;
        }
    } 
    console.log('f_gamemap:' + f_gamemap);  
    
    // getting the form values - team_one_faction
    var s_team_one_faction= this.state.currentMatchData.team_one_faction;  
    console.log('this.state.currentMatchData.team_one_faction:' + s_team_one_faction);
         
    var jq_team_one_faction = $("#team_one_faction").val();  
    console.log('jq_team_one_faction:' + jq_team_one_faction);
    
    var f_team_one_faction = "";
    if (typeof s_team_one_faction != 'undefined' && s_team_one_faction) {
        f_team_one_faction = s_team_one_faction;
    } else {
        if (typeof jq_team_one_faction != 'undefined' && jq_team_one_faction) {
          f_team_one_faction = jq_team_one_faction;
        }
    } 
    console.log('f_team_one_faction:' + f_team_one_faction);  
    
     // getting the form values - team_one_score
    var s_team_one_score = this.state.currentMatchData.team_one_score;  
    console.log('this.state.currentMatchData.team_one_score:' + s_team_one_score);
         
    var jq_team_one_score = $("#team_one_score").val();  
    console.log('jq_team_one_score:' + jq_team_one_score);
    
    var f_team_one_score = "";
    if (typeof s_team_one_score != 'undefined' && s_team_one_score) {
        f_team_one_score = s_team_one_score;
    } else {
        if (typeof jq_team_one_score != 'undefined' && jq_team_one_score) {
          f_team_one_score = jq_team_one_score;
        }
    } 
    console.log('f_team_one_score:' + f_team_one_score); 
    
    
    // getting the form values - team_two_faction
    var s_team_two_faction = this.state.currentMatchData.team_two_faction;  
    console.log('this.state.currentMatchData.team_two_faction:' + s_team_two_faction);
         
    var jq_team_two_faction = $("#team_two_faction").val();  
    console.log('jq_team_two_faction:' + jq_team_two_faction);
    
    var f_team_two_faction = "";
    if (typeof s_team_two_faction != 'undefined' && s_team_two_faction) {
        f_team_two_faction = s_team_two_faction;
    } else {
        if (typeof jq_team_two_faction != 'undefined' && jq_team_two_faction) {
          f_team_two_faction = jq_team_two_faction;
        }
    } 
    console.log('f_team_two_faction:' + f_team_two_faction);  
    
     // getting the form values - team_two_score
    var s_team_two_score = this.state.currentMatchData.team_two_score;  
    console.log('this.state.currentMatchData.team_two_score:' + s_team_two_score);
         
    var jq_team_two_score = $("#team_two_score").val();  
    console.log('jq_team_two_score:' + jq_team_two_score);
    
    var f_team_two_score = "";
    if (typeof s_team_two_score != 'undefined' && s_team_two_score) {
        f_team_two_score = s_team_two_score;
    } else {
        if (typeof jq_team_two_score != 'undefined' && jq_team_two_score) {
          f_team_two_score = jq_team_two_score;
        }
    } 
    console.log('f_team_two_score:' + f_team_two_score); 
    
    
      // getting the form values - winner
    var s_winner = this.state.currentMatchData.winner;  
    console.log('this.state.currentMatchData.winner:' + s_winner);
         
    var jq_winner = $("#winner").val();  
    console.log('jq_winner:' + jq_winner);
    
    var f_winner = "";
    if (typeof s_winner != 'undefined' && s_winner) {
        f_winner = s_winner;
    } else {
        if (typeof jq_winner != 'undefined' && jq_winner) {
          f_winner = jq_winner;
        }
    } 
    console.log('f_winner:' + f_winner);    
        
     
    const postObj = {
      matchid: this.props.valueProps.match,
      roomcode: f_roomcode,
      gamemode: f_gamemode,
      gamemap: f_gamemap,
      team_one_faction: f_team_one_faction,
      team_one_score: f_team_one_score,
      team_two_faction: f_team_two_faction,
      team_two_score: f_team_two_score,
      winner: f_winner
    } 

    console.log('POST');       
    console.log('matchid:' + this.props.valueProps.match);  
    console.log('roomcode:' + f_roomcode); 
    console.log('gamemode:' + f_gamemode); 
    console.log('gamemap:' + f_gamemap);  
    console.log('team_one_faction:' + f_team_one_faction); 
    console.log('team_one_score:' + f_team_one_score); 
    console.log('team_two_faction:' + f_team_two_faction);  
    console.log('team_two_score:' + f_team_two_score); 
    console.log('winner:' + f_winner);     
            
    console.log('postObj:');
    console.log(postObj);
    
    this.props.updateMatch( postObj );
    
    console.log('step4 afer update post valueProps:');
    console.log(this.props);

//    this.props.getMatch(this.props.valueProps.match);
//    console.log('get match data pull after update - this.props');
//    console.log(this.props);

    //clear state
    this.setState({
        matchData: [] 
    });
    
  };
  
  static propTypes = {
    teams: PropTypes.array.isRequired,  
    match: PropTypes.array.isRequired,
    gamemaps: PropTypes.array.isRequired,  
    gamemodes: PropTypes.array.isRequired,    
    getMatch: PropTypes.func.isRequired,
    updateMatch: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired,
    getGameMaps: PropTypes.func.isRequired,
    getGameModes: PropTypes.func.isRequired, 
  };
  

  render() {
    const { valueProps, handleChange } = this.props;
     
    console.log('step4 Match Admin: valueProps.match:');
    console.log(this.props.match);

    return (
        <React.Fragment>
       
         <div className="card card-body mt-4 mb-4">
          <form onSubmit={this.onSubmit.bind(this)}>
            <h1>Match Editor</h1>
            <p>match id: { valueProps.match }</p>

            <div className="form-group">
            <label>Room Code</label>
            <input
              id="roomcode"
              className="form-control"
              type="text"
              name="roomcode"
              onChange={(e) => {
              let { currentMatchData } = this.state;
              currentMatchData.roomcode = e.target.value;
              console.log("e.target.value:" + e.target.value);
              console.log("currentMatchData.roomcode:" + currentMatchData.roomcode );
              this.setState({ currentMatchData });
              
              }}
              defaultValue={ this.props.match.roomcode }
            />
          </div>       
            
 
 		  		<div className="form-group">
            <label>Game Mode</label>          
               <select id="gamemode" name="gamemode" className="form-control custom-select" 
               onChange={(e) => {
              let { currentMatchData } = this.state;
              currentMatchData.winner = e.target.value;
              console.log("e.target.value:" + e.target.value);
              console.log("currentMatchData.gamemode:" + currentMatchData.gamemode );
              this.setState({ currentMatchData });          
              }}
              defaultValue={ this.props.match.gamemode }
               >
              <option value="">Select Game Mode</option>
                {this.props.gamemodes.map(gmode => (
                <option key={gmode.id} value={gmode.id}>{gmode.name}</option>
               ))}
              </select>
          </div>
          
          

		  		<div className="form-group">
            <label>Game Map</label>          
               <select id="gamemap" name="gamemap" className="form-control custom-select" 
               onChange={(e) => {
              let { currentMatchData } = this.state;
              currentMatchData.winner = e.target.value;
              console.log("e.target.value:" + e.target.value);
              console.log("currentMatchData.gamemap:" + currentMatchData.gamemap );
              this.setState({ currentMatchData });          
              }}
              defaultValue={ this.props.match.gamemap }
               >
              <option value="">Select Game Map</option>
                {this.props.gamemaps.map(gmap => (
                <option key={gmap.id} value={gmap.id}>{gmap.name}</option>
               ))}
              </select>
          </div>
          
          
                      
 		  		<div className="form-group">
            <label>Team One Faction</label>          
               <select id="team_one_faction" name="team_one_faction" className="form-control custom-select" 
               onChange={(e) => {
              let { currentMatchData } = this.state;
              currentMatchData.team_one_faction = e.target.value;
              console.log("e.target.value:" + e.target.value);
              console.log("currentMatchData.team_one_faction:" + currentMatchData.team_one_faction );
              this.setState({ currentMatchData });          
              }}
              defaultValue={ this.props.match.team_one_faction }
               >
              <option value="">Select Game Map</option>
                {this.props.gamefactions.map(gfaction => (
                <option key={gfaction.id} value={gfaction.id}>{gfaction.name}</option>
               ))}
              </select>
          </div>
            

            <div className="form-group">
            <label>Team One Score</label>          
               <input
              id="team_one_score" 
              className="form-control"
              type="number"
              min="0" 
              max="1000" 
              step="1"
              name="team_one_score"
              onChange={(e) => {
              let { currentMatchData } = this.state;
              currentMatchData.team_one_score = e.target.value;
              console.log("e.target.value:" + e.target.value);
              console.log("currentMatchData.team_one_score:" + currentMatchData.team_one_score );
              this.setState({ currentMatchData });          
              }}
              defaultValue={ this.props.match.team_one_score }              
            /> 
            </div>
            

 		  		<div className="form-group">
            <label>Team Two Faction</label>          
               <select id="team_two_faction" name="team_two_faction" className="form-control custom-select" 
               onChange={(e) => {
              let { currentMatchData } = this.state;
              currentMatchData.team_two_faction = e.target.value;
              console.log("e.target.value:" + e.target.value);
              console.log("currentMatchData.team_two_faction:" + currentMatchData.team_two_faction );
              this.setState({ currentMatchData });          
              }}
              defaultValue={ this.props.match.team_two_faction }
               >
              <option value="">Select Game Map</option>
                {this.props.gamefactions.map(gfaction => (
                <option key={gfaction.id} value={gfaction.id}>{gfaction.name}</option>
               ))}
              </select>
          </div>
          
 
            <div className="form-group">
            <label>Team Two Score</label>          
               <input
              id="team_two_score" 
              className="form-control"
              type="number"
              min="0" 
              max="1000" 
              step="1"
              name="team_two_score"
              onChange={(e) => {
              let { currentMatchData } = this.state;
              currentMatchData.team_two_score = e.target.value;
              console.log("e.target.value:" + e.target.value);
              console.log("currentMatchData.team_two_score:" + currentMatchData.team_two_score );
              this.setState({ currentMatchData });          
              }}
              defaultValue={ this.props.match.team_two_score }              
            /> 
            </div>
 
		            <div className="form-group">
            <label>Match Winner</label>         
               <select 
               id="winner" name="winner" className="form-control custom-select"
               datainitval={ this.props.match.winner }
               onChange={(e) => {
              let { currentMatchData } = this.state;
              currentMatchData.winner = e.target.value;
              console.log("e.target.value:" + e.target.value);
              console.log("currentMatchData.winner:" + currentMatchData.winner );
              this.setState({ currentMatchData });          
              }}
              defaultValue={ this.props.match.winner }
               >
              <option value="">Select Winner</option>
                {this.props.teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
               ))}
              </select>
          </div>
 
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.back}>
              Back
            </button>
          </div>
           
           <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Update Match
            </button>
          </div>
         
 
         </form>       
         </div>
        
        </React.Fragment>

    );
  }
}
const mapStateToProps = state => ({
  match: state.match.match,
  teams: state.teams.teams,
  gamemaps: state.gamemaps.gamemaps,
  gamemodes: state.gamemodes.gamemodes,
  gamefactions: state.gamefactions.gamefactions
});

export default connect( mapStateToProps,{ getMatch, updateMatch, getTeams, getGameMaps, getGameModes, getGameFactions } )(StepFourMatchAdminForm);
 