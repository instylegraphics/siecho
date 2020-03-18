import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatch, updateMatch, getMatches } from "../../actions/matches";
import { getTeams} from "../../actions/teams";
import { getGameMaps } from "../../actions/gamemaps";
import { getGameModes } from "../../actions/gamemodes";

export class ConfirmMatchForm extends Component {

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
    this.props.getMatches(this.props.valueProps.series);
    
    const { matchData } = this.state;
    this.setState({ 
      matchData: this.props.match   
      
   });  
 
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
  
    
  };
 
   
  
  static propTypes = {
    getMatch: PropTypes.func.isRequired,
    updateMatch: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired,
    getGameMaps: PropTypes.func.isRequired,
    getGameModes: PropTypes.func.isRequired,
    getMatches: PropTypes.func.isRequired
  };
  
 


  render() {
    const { valueProps, handleChange } = this.props;
     
    console.log('step 5 Confirm Match Admin: valueProps.match:');
    console.log(this.props.match);
    
    //get values 
    var jsonQuery = require('json-query');
    var match_id = this.props.valueProps.match;
    // tournament info
    var tournament_name_value = jsonQuery('[id=' + match_id + '].series.tournament.name', { data: this.props.matches }).value;
    var tournament_scheduled_date = jsonQuery('[id=' + match_id + '].series.tournament.scheduled_date', { data: this.props.matches }).value;
    // series info
    var series_name = jsonQuery('[id=' + match_id + '].series.name', { data: this.props.matches }).value;
    var series_order = jsonQuery('[id=' + match_id + '].series.series_order', { data: this.props.matches }).value;
    var series_best_of = jsonQuery('[id=' + match_id + '].series.best_of', { data: this.props.matches }).value;
    var series_active = jsonQuery('[id=' + match_id + '].series.active', { data: this.props.matches }).value;    
    var series_ended = jsonQuery('[id=' + match_id + '].series.ended', { data: this.props.matches }).value;
    // match info
    var match_team_one_name = jsonQuery('[id=' + match_id + '].team_one.name', { data: this.props.matches }).value;
    var match_team_two_name = jsonQuery('[id=' + match_id + '].team_two.name', { data: this.props.matches }).value;
    var match_match_order = jsonQuery('[id=' + match_id + '].match_order', { data: this.props.matches }).value;
    var match_active = jsonQuery('[id=' + match_id + '].active', { data: this.props.matches }).value;    
    var match_ended = jsonQuery('[id=' + match_id + '].ended', { data: this.props.matches }).value;     
    
              
    return (
        <React.Fragment>
       
         <div className="card card-body mt-4 mb-4">
          
            <h1>Final Step: Confirmation</h1>
            <p>match id: { valueProps.match }</p>
            
            <p>tournament_name_value: { tournament_name_value }</p>
            <p>tournament_scheduled_date: { tournament_scheduled_date }</p>
            
            <p>series_name: { series_name }</p>
            <p>series_order: { series_order }</p>
            <p>series_best_of: { series_best_of }</p>
            <p>series_active: { String(series_active) }</p>
            <p>series_ended: { String(series_ended) }</p>
            
            <p>match_team_one_name: { match_team_one_name }</p>
            <p>match_team_two_name: { match_team_two_name }</p>
            <p>match_match_order: { match_match_order }</p>
            <p>match_active: { String(match_active) }</p>
            <p>match_ended: { String(match_ended) }</p>           
            
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.back}>
              Back
            </button>
          </div>
 
           <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.continue}>
              Edit This Match Now
            </button>
          </div>
         
 
               
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
  matches: state.matches.matches
});

export default connect( mapStateToProps,{ getMatch, updateMatch, getTeams, getGameMaps, getGameModes, getMatches } )(ConfirmMatchForm);
 