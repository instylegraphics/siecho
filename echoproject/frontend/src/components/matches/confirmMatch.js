import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatch, updateMatch } from "../../actions/matches";
import { updateSeriesEnd } from "../../actions/series";
import { getSeriesDetails } from "../../actions/series";
import { getTeams} from "../../actions/teams";
import { getGameMaps } from "../../actions/gamemaps";
import { getGameModes } from "../../actions/gamemodes";
import { getGameFactions } from "../../actions/gamefactions";

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


   static propTypes = {
    updateMatch: PropTypes.func.isRequired,
    updateSeriesEnd: PropTypes.func.isRequired,
    getSeriesDetails: PropTypes.array.isRequired,
    getTeams: PropTypes.func.isRequired,
    getGameMaps: PropTypes.func.isRequired,
    getGameModes: PropTypes.func.isRequired,
    getMatches: PropTypes.func.isRequired,
    getMatchesDetails: PropTypes.func.isRequired,    
    getMatch: PropTypes.func.isRequired, 
    match: PropTypes.array.isRequired,
    matches: PropTypes.array.isRequired,
    matchesdetails: PropTypes.array.isRequired,
    teams: PropTypes.array.isRequired,
    gamemaps: PropTypes.array.isRequired,
    gamemodes: PropTypes.array.isRequired,
    gamefactions: PropTypes.array.isRequired,
  };
  
  
  componentDidMount() {

    console.log("componentDidMount matchid:" + this.props.valueProps.match);
    console.log('componentDidMount this.props');
    console.log(this.props);
    console.log('componentDidMount this.props.match');    
    console.log(this.props.valueProps.match);
    console.log('valueProps.tournament');
    console.log(this.props.valueProps.tournament);
    
    this.props.getMatch(this.props.valueProps.match);
    this.props.getSeriesDetails(this.props.valueProps.tournament);
    this.props.getTeams();
    this.props.getGameMaps();
    this.props.getGameModes();
    this.props.getGameFactions();
        
    const { matchData } = this.state;
    this.setState({ 
      matchData: this.props.match   
      
   });  
 
  }  

 
  //continue button function
  continue = e => {
    e.preventDefault();
    
    //grab values to update series to activate, then go forward to edit page
    var f_jsonQuery = require('json-query');
    
    var f_seriesid = this.props.valueProps.series;
    console.log('seriesid:' + f_seriesid); 
    
    var f_tournamentid = this.props.valueProps.tournament;
    var f_series_name = f_jsonQuery('[id=' + f_seriesid + '].name', { data: this.props.seriesdetails }).value;
    var f_match_team_one_id = f_jsonQuery('[id=' + f_seriesid + '].team_one.id', { data: this.props.seriesdetails }).value;
    var f_match_team_two_id = f_jsonQuery('[id=' + f_seriesid + '].team_two.id', { data: this.props.seriesdetails }).value;
    var f_series_active = f_jsonQuery('[id=' + f_seriesid + '].active', { data: this.props.seriesdetails }).value;

/*
    var f_series_name = f_jsonQuery('[id=' + f_seriesid + '].name', { data: this.props.series }).value;
    var f_match_team_one_id = f_jsonQuery('[id=' + f_seriesid + '].team_one', { data: this.props.series }).value;
    var f_match_team_two_id = f_jsonQuery('[id=' + f_seriesid + '].team_two', { data: this.props.series }).value;
    var f_series_active = f_jsonQuery('[id=' + f_seriesid + '].active', { data: this.props.series }).value;
*/

     const postObj = {
      id: f_seriesid,
      tournament: f_tournamentid,
      name: f_series_name,
      team_one: f_match_team_one_id,
      team_two: f_match_team_two_id,
      active: 'true',
      ended: 'false'
    } 

    console.log('POST');
  
    console.log('seriesid:' + f_seriesid);  
    console.log('tournament:' + f_tournamentid); 
    console.log('name:' + f_series_name); 
    console.log('team_one:' + f_match_team_one_id);  
    console.log('team_two:' + f_match_team_two_id); 
    console.log('f_series_active:' + f_series_active);
       
    console.log('series update: postObj:');
    console.log(postObj);
    
    if (f_series_active != true) {
      //post and update series
      this.props.updateSeriesEnd( postObj );
      console.log("update series:" + f_series_active);
    }else{
    console.log("else true do not update series:" + f_series_active);
    }
    //next page
    this.props.nextStep();
  };
  
  
  //back button function
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
 
  
 
  render() {
    const { valueProps, handleChange } = this.props;
     
    console.log('step 5 Confirm Match Admin');

    
    //get values 
    var jsonQuery = require('json-query');
    var match_id = this.props.valueProps.match;
    console.log('match_id:' + match_id );
    var tournament_id = this.props.valueProps.tournament;
    console.log('tournament_id:' + tournament_id );
    var series_id = this.props.valueProps.series;
    console.log('series_id:' + series_id );
    
 
    // tournament info
    var tournament_name_value = jsonQuery('[id=' + series_id + '].tournament.name', { data: this.props.seriesdetails }).value;
    var tournament_scheduled_date = jsonQuery('[id=' + series_id + '].tournament.scheduled_date', { data: this.props.seriesdetails }).value;
    var dateFormat = require('dateformat');
    tournament_scheduled_date = dateFormat(tournament_scheduled_date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    
    // series info
    var series_name = jsonQuery('[id=' + series_id + '].name', { data: this.props.seriesdetails }).value;
    var series_order = jsonQuery('[id=' + series_id + '].series_order', { data: this.props.seriesdetails }).value;
    var series_best_of = jsonQuery('[id=' + series_id + '].best_of', { data: this.props.seriesdetails }).value;
    var series_active = jsonQuery('[id=' + series_id + '].active', { data: this.props.seriesdetails }).value;    
    var series_ended = jsonQuery('[id=' + series_id + '].ended', { data: this.props.seriesdetails }).value;

    // match info
    var match_team_one_name = jsonQuery('team_one.short_name', { data: this.props.match }).value;
    var match_team_two_name = jsonQuery('team_two.short_name', { data: this.props.match }).value;
    var match_match_order = jsonQuery('match_order', { data: this.props.match }).value;
    var match_active = jsonQuery('active', { data: this.props.match }).value;    
    var match_ended = jsonQuery('ended', { data: this.props.match }).value;
    
    var match_team_one_image = jsonQuery('team_one.logo', { data: this.props.match }).value;
    var match_team_two_image = jsonQuery('team_two.logo', { data: this.props.match }).value;      

/*    var match_team_one_name = jsonQuery('[id=' + match_id + '].team_one.name', { data: this.props.match }).value;
    var match_team_two_name = jsonQuery('[id=' + match_id + '].team_two.name', { data: this.props.match }).value;
    var match_match_order = jsonQuery('[id=' + match_id + '].match_order', { data: this.props.match }).value;
    var match_active = jsonQuery('[id=' + match_id + '].active', { data: this.props.match }).value;    
    var match_ended = jsonQuery('[id=' + match_id + '].ended', { data: this.props.match }).value;     
*/        
    

    
    return (
<React.Fragment>
<main className="page-content">
  <form>
    <div className="container">
      <div className="col-md-8 m-auto">
        
        <div className="card card-body mt-4 mb-4">

          <div className="md-stepper-horizontal">
              <div className="md-step done">
                <div className="md-step-circle"><span>1</span></div>
                <div className="md-step-title">Tournament</div>
                <div className="md-step-bar-left"></div>
                <div className="md-step-bar-right"></div>
              </div>
              <div className="md-step">
                <div className="md-step-circle"><span>2</span></div>
                <div className="md-step-title">Series</div>
                <div className="md-step-bar-left"></div>
                <div className="md-step-bar-right"></div>
              </div>
              <div className="md-step done">
                <div className="md-step-circle"><span>3</span></div>
                <div className="md-step-title">Match</div>
                <div className="md-step-bar-left"></div>
                <div className="md-step-bar-right"></div>
              </div>
              <div className="md-step active editable">
                <div className="md-step-circle"><span>4</span></div>
                <div className="md-step-title">Review</div>
                <div className="md-step-bar-left"></div>
                <div className="md-step-bar-right"></div>
              </div>
          </div>
                    
				<div className="mt-4">
					<label><h2>Review Match Details</h2></label> 
					<div className="row">
						<div className="col-md-3 col-sm-12">
							<h5>Tournament:</h5>
						</div>
						<div className="col-md-9 col-sm-12">
							<p className="text-warning font-weight-bold">{ tournament_name_value }</p>
						</div>

						<div className="col-md-3 col-sm-12">
							<h5>Date & Time:</h5>
						</div>
						<div className="col-md-9 col-sm-12">
							<p className="text-warning font-weight-bold">{ String(tournament_scheduled_date) }</p>
						</div>
						
						<div className="col-md-3 col-sm-12">
							<h5>Series:</h5>
						</div>
						<div className="col-md-9 col-sm-12">
							<p className="text-warning font-weight-bold">{ series_name }</p>
						</div>
						
						<div className="col-md-3 col-sm-6">
							<h5>Series Order:</h5>
						</div>
						
						<div className="col-md-9 col-sm-6">
							<p className="text-warning font-weight-bold">{ series_order }</p>
						</div>

						<div className="col-md-3 col-sm-6">
							<h5>Series Ended:</h5>
						</div>
						
						<div className="col-md-3 col-sm-6">
              { String(series_ended) == 'true' ? <i className="fas fa-check fa-lg green-text"></i> : <i className="fas fa-times fa-lg red-text"></i> }
						</div>
                                     
						<div className="col-md-3 col-sm-6">
							<h5>Series Active:</h5>
						</div>

						<div className="col-md-3 col-sm-6">
              { String(series_active) == 'true' ? <i className="fas fa-check fa-lg green-text"></i> : <i className="fas fa-times fa-lg red-text"></i> }                           
						</div>

				  	<div className="col-md-3 col-sm-6">						
							<h5>Match Ended:</h5>
						</div>
						<div className="col-md-3 col-sm-6">
              { String(match_ended) == 'true' ? <i className="fas fa-check fa-lg green-text"></i> : <i className="fas fa-times fa-lg red-text"></i> }                                         
						</div>

						<div className="col-md-3 col-sm-6">
							<h5>Match Active:</h5>
						</div>
						<div className="col-md-3 col-sm-6">
              { String(match_active) == 'true' ? <i className="fas fa-check fa-lg green-text"></i> : <i className="fas fa-times fa-lg red-text"></i> }                        
						</div>
            						 
					</div>


					
					<div className="row d-flex justify-content-center mt-2">
						<div className="col-md-5 match-editor-border">
							<div className="text-center mt-3 mb-2">
								<h6>Team One</h6>
								<h4 className="text-warning font-weight-bold">{ match_team_one_name }</h4>
                <img className="card--body__img card-img-top pb-2" src={match_team_one_image} alt={ match_team_one_name } aria-label={ match_team_one_name } />
							</div>
						</div>
						<div className="col-md-2 vertical-align-ultimate text-center">
							<i className="fas fa-times fa-7x"></i>
						</div>
						<div className="col-md-5 match-editor-border">
							<div className="text-center mt-3 mb-2">
								<h6>Team Two</h6>
								<h4 className="text-warning font-weight-bold">{ match_team_two_name }</h4>
								<img className="card--body__img card-img-top pb-2" src={match_team_two_image} alt={ match_team_one_name } aria-label={ match_team_one_name } />
							</div>
						</div>
					</div>

					<div className="row mt-3">
 
 						<div className="col-md-12 col-sm-12 mt-2 mb-4">
							<h5>Edit Match Number  <span className="text-warning font-weight-bold">{ match_match_order }</span> out of <span className="text-warning font-weight-bold">{ series_best_of }</span> Matches?</h5>
						</div>
					</div>


				</div>
        
  
        <div className="form-group mt-2">
          <button type="button" className="btn btn-primary btn-lg btn btn-deep-purple waves-effect waves-light" onClick={this.back}>
            Back
          </button>
          <button type="button" className="btn btn-primary btn-lg btn btn-deep-purple waves-effect waves-light float-right" onClick={this.continue}>
            Edit This Match
          </button>
        </div>
 
       </div>
      </div>
    </div>
  </form>  
</main>
</React.Fragment>

    );
  }
}
const mapStateToProps = state => ({
  match: state.match.match,
  matches: state.matches.matches,
  matchesdetails: state.matchesdetails.matchesdetails,
  seriesdetails: state.seriesdetails.seriesdetails,
  teams: state.teams.teams,
  gamemaps: state.gamemaps.gamemaps,
  gamemodes: state.gamemodes.gamemodes,
  gamefactions: state.gamefactions.gamefactions  
});

export default connect( mapStateToProps,{ getMatch, updateMatch, updateSeriesEnd, getSeriesDetails, getTeams, getGameMaps, getGameModes, getGameFactions } )(ConfirmMatchForm);
 