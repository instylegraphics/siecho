import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatch, getMatches, getMatchesDetails, updateMatch } from "../../actions/matches";
import { getTeams} from "../../actions/teams";
import { getGameMaps } from "../../actions/gamemaps";
import { getGameModes } from "../../actions/gamemodes";
import { getGameFactions } from "../../actions/gamefactions";
import { getPlayers } from "../../actions/players";
import { getPlayerStats, addPlayerStats, deletePlayerStats, updatePlayerStats } from "../../actions/playerstats";

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
    },
    playerAddTeamOne: {
      match:"",
      player:"",
      team: "",
      game: "",
      gamemode: "",
      gamemap: ""
    },
    playerAddTeamTwo: {
      match:"",
      player:"",
      team: "",
      game: "",
      gamemode: "",
      gamemap: ""
    }    
  };

  static propTypes = {
    match: PropTypes.array.isRequired,
    matches: PropTypes.array.isRequired,
    matchesdetails: PropTypes.array.isRequired,
    teams: PropTypes.array.isRequired,
    gamemaps: PropTypes.array.isRequired,
    gamemodes: PropTypes.array.isRequired,
    gamefactions: PropTypes.array.isRequired,
    getMatches: PropTypes.func.isRequired,
    getMatchesDetails: PropTypes.func.isRequired,    
    getMatch: PropTypes.func.isRequired,
    updateMatch: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired,
    getGameMaps: PropTypes.func.isRequired,
    getGameModes: PropTypes.func.isRequired,
    getGameFactions: PropTypes.func.isRequired,
    getPlayers: PropTypes.array.isRequired,
    getPlayerStats: PropTypes.array.isRequired,
    addPlayerStats: PropTypes.array.isRequired,
    deletePlayerStats: PropTypes.array.isRequired,
    updatePlayerStats: PropTypes.func.isRequired
  };
  
  
  componentDidMount() {
    //console.log("componentDidMount matchid:" + this.props.valueProps.match);
    this.props.getMatch(this.props.valueProps.match);
    this.props.getMatches(this.props.valueProps.series);
    this.props.getMatchesDetails(this.props.valueProps.series);
    this.props.getTeams();
    this.props.getGameMaps();
    this.props.getGameModes();
    this.props.getGameFactions();
    this.props.getPlayers();
    this.props.getPlayerStats();
    
    //console.log('componentDidMount this.props');
    //console.log(this.props);
    //console.log('componentDidMount this.props.match'); 
    //console.log(this.props.match);

    
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
    
    //clear state
    this.setState({
        matchData: [] 
    });
    
  };
 
     
  //submit button function
  onSubmit = e => {
    e.preventDefault();
    //console.log('inside match form');
    //console.log('b4 submit this.props :');
    //console.log(this.props);
    //console.log('valueProps Form - match id :' + this.props.valueProps.match );
        
    //console.log('b4 submit');
   
    //grab values to update series to activate, then go forward to edit page
    var f_jsonQuery = require('json-query');
    
    // getting the form values - roomcode
    var s_roomcode = this.state.currentMatchData.roomcode;  
    //console.log('this.state.currentMatchData.roomcode:' + s_roomcode);
         
    var jq_roomcode = $("#roomcode").val();  
    //console.log('jquery roomcode:' + jq_roomcode);
    
    var f_roomcode = "";
    if (typeof s_roomcode != 'undefined' && s_roomcode) {
        f_roomcode = s_roomcode;
    } else {
        if (typeof jq_roomcode != 'undefined' && jq_roomcode) {
          f_roomcode = jq_roomcode;
        }
    } 
    //console.log('f_roomcode:' + f_roomcode);
       
    // getting the form values - gamemode
    var s_gamemode = this.state.currentMatchData.gamemode;  
    //console.log('this.state.currentMatchData.gamemode:' + s_gamemode);
         
    var jq_gamemode = $("#gamemode").val();  
    //console.log('jq_gamemode:' + jq_gamemode);
    
    var f_gamemode = "";
    if (typeof s_gamemode != 'undefined' && s_gamemode) {
        f_gamemode = s_gamemode;
    } else {
        if (typeof jq_gamemode != 'undefined' && jq_gamemode) {
          f_gamemode = jq_gamemode;
        }
    } 
    //console.log('f_gamemode:' + f_gamemode);     
 
    // getting the form values - gamemap
    var s_gamemap = this.state.currentMatchData.gamemap;  
    //console.log('this.state.currentMatchData.gamemap:' + s_gamemap);
         
    var jq_gamemap = $("#gamemap").val();  
    //console.log('jq_gamemap:' + jq_gamemap);
    
    var f_gamemap = "";
    if (typeof s_gamemap != 'undefined' && s_gamemap) {
        f_gamemap = s_gamemap;
    } else {
        if (typeof jq_gamemap != 'undefined' && jq_gamemap) {
          f_gamemap = jq_gamemap;
        }
    } 
    //console.log('f_gamemap:' + f_gamemap);  
    
    // getting the form values - team_one_faction
    var s_team_one_faction= this.state.currentMatchData.team_one_faction;  
    //console.log('this.state.currentMatchData.team_one_faction:' + s_team_one_faction);
         
    var jq_team_one_faction = $("#team_one_faction").val();  
    //console.log('jq_team_one_faction:' + jq_team_one_faction);
    
    var f_team_one_faction = "";
    if (typeof s_team_one_faction != 'undefined' && s_team_one_faction) {
        f_team_one_faction = s_team_one_faction;
    } else {
        if (typeof jq_team_one_faction != 'undefined' && jq_team_one_faction) {
          f_team_one_faction = jq_team_one_faction;
        }
    } 
    //console.log('f_team_one_faction:' + f_team_one_faction);  
    
     // getting the form values - team_one_score
    var s_team_one_score = this.state.currentMatchData.team_one_score;  
    //console.log('this.state.currentMatchData.team_one_score:' + s_team_one_score);
         
    var jq_team_one_score = $("#team_one_score").val();  
    //console.log('jq_team_one_score:' + jq_team_one_score);
    
    var f_team_one_score = "";
    if (typeof s_team_one_score != 'undefined' && s_team_one_score) {
        f_team_one_score = s_team_one_score;
    } else {
        if (typeof jq_team_one_score != 'undefined' && jq_team_one_score) {
          f_team_one_score = jq_team_one_score;
        }
    } 
    //console.log('f_team_one_score:' + f_team_one_score); 
    
    
    // getting the form values - team_two_faction
    var s_team_two_faction = this.state.currentMatchData.team_two_faction;  
    //console.log('this.state.currentMatchData.team_two_faction:' + s_team_two_faction);
         
    var jq_team_two_faction = $("#team_two_faction").val();  
    //console.log('jq_team_two_faction:' + jq_team_two_faction);
    
    var f_team_two_faction = "";
    if (typeof s_team_two_faction != 'undefined' && s_team_two_faction) {
        f_team_two_faction = s_team_two_faction;
    } else {
        if (typeof jq_team_two_faction != 'undefined' && jq_team_two_faction) {
          f_team_two_faction = jq_team_two_faction;
        }
    } 
    //console.log('f_team_two_faction:' + f_team_two_faction);  
    
     // getting the form values - team_two_score
    var s_team_two_score = this.state.currentMatchData.team_two_score;  
    //console.log('this.state.currentMatchData.team_two_score:' + s_team_two_score);
         
    var jq_team_two_score = $("#team_two_score").val();  
    //console.log('jq_team_two_score:' + jq_team_two_score);
    
    var f_team_two_score = "";
    if (typeof s_team_two_score != 'undefined' && s_team_two_score) {
        f_team_two_score = s_team_two_score;
    } else {
        if (typeof jq_team_two_score != 'undefined' && jq_team_two_score) {
          f_team_two_score = jq_team_two_score;
        }
    } 
    //console.log('f_team_two_score:' + f_team_two_score); 
    
    // getting the form values - winner **old manual method
/*    var s_winner = this.state.currentMatchData.winner;  
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
*/        
    //winner should be auto determind
    var f_winner = null;
    
    const postObj = {
      matchid: this.props.valueProps.match,
      roomcode: f_roomcode,
      gamemode: f_gamemode,
      gamemap: f_gamemap,
      team_one_faction: f_team_one_faction,
      team_one_score: f_team_one_score,
      team_two_faction: f_team_two_faction,
      team_two_score: f_team_two_score,
      winner: f_winner,
      active: 'true',
      ended: 'false'    
    } 

    console.log('POST update match');       
/*    console.log('matchid:' + this.props.valueProps.match);  
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
*/    
    this.props.updateMatch( postObj );
    
    //console.log('step4 afer update post valueProps:');
    //console.log(this.props);

    //clear state
/*
    this.setState({
        matchData: [] 
    });
*/    
  };
  

  //function to end match active to false
  endMatchForm = e => {
    e.preventDefault();
 
    //console.log('inside match form END');
    //console.log('b4 submit this.props :');
    //console.log(this.props);
    //console.log('valueProps Form - match id :' + this.props.valueProps.match );
        
    //console.log('b4 submit');
   
    //grab values to update series to activate, then go forward to edit page
    var f_jsonQuery = require('json-query');
    
    // getting the form values - roomcode
    var s_roomcode = this.state.currentMatchData.roomcode;  
    //console.log('this.state.currentMatchData.roomcode:' + s_roomcode);
         
    var jq_roomcode = $("#roomcode").val();  
    //console.log('jquery roomcode:' + jq_roomcode);
    
    var f_roomcode = "";
    if (typeof s_roomcode != 'undefined' && s_roomcode) {
        f_roomcode = s_roomcode;
    } else {
        if (typeof jq_roomcode != 'undefined' && jq_roomcode) {
          f_roomcode = jq_roomcode;
        }
    } 
    //console.log('f_roomcode:' + f_roomcode);
       
    // getting the form values - gamemode
    var s_gamemode = this.state.currentMatchData.gamemode;  
    //console.log('this.state.currentMatchData.gamemode:' + s_gamemode);
         
    var jq_gamemode = $("#gamemode").val();  
    //console.log('jq_gamemode:' + jq_gamemode);
    
    var f_gamemode = "";
    if (typeof s_gamemode != 'undefined' && s_gamemode) {
        f_gamemode = s_gamemode;
    } else {
        if (typeof jq_gamemode != 'undefined' && jq_gamemode) {
          f_gamemode = jq_gamemode;
        }
    } 
    //console.log('f_gamemode:' + f_gamemode);     
 
    // getting the form values - gamemap
    var s_gamemap = this.state.currentMatchData.gamemap;  
    //console.log('this.state.currentMatchData.gamemap:' + s_gamemap);
         
    var jq_gamemap = $("#gamemap").val();  
    //console.log('jq_gamemap:' + jq_gamemap);
    
    var f_gamemap = "";
    if (typeof s_gamemap != 'undefined' && s_gamemap) {
        f_gamemap = s_gamemap;
    } else {
        if (typeof jq_gamemap != 'undefined' && jq_gamemap) {
          f_gamemap = jq_gamemap;
        }
    } 
    //console.log('f_gamemap:' + f_gamemap);  
    
    // getting the form values - team_one_faction
    var s_team_one_faction= this.state.currentMatchData.team_one_faction;  
    //console.log('this.state.currentMatchData.team_one_faction:' + s_team_one_faction);
         
    var jq_team_one_faction = $("#team_one_faction").val();  
    //console.log('jq_team_one_faction:' + jq_team_one_faction);
    
    var f_team_one_faction = "";
    if (typeof s_team_one_faction != 'undefined' && s_team_one_faction) {
        f_team_one_faction = s_team_one_faction;
    } else {
        if (typeof jq_team_one_faction != 'undefined' && jq_team_one_faction) {
          f_team_one_faction = jq_team_one_faction;
        }
    } 
    //console.log('f_team_one_faction:' + f_team_one_faction);  
    
     // getting the form values - team_one_score
    var s_team_one_score = this.state.currentMatchData.team_one_score;  
    //console.log('this.state.currentMatchData.team_one_score:' + s_team_one_score);
         
    var jq_team_one_score = $("#team_one_score").val();  
    //console.log('jq_team_one_score:' + jq_team_one_score);
    
    var f_team_one_score = "";
    if (typeof s_team_one_score != 'undefined' && s_team_one_score) {
        f_team_one_score = s_team_one_score;
    } else {
        if (typeof jq_team_one_score != 'undefined' && jq_team_one_score) {
          f_team_one_score = jq_team_one_score;
        }
    } 
    //console.log('f_team_one_score:' + f_team_one_score); 
    
    
    // getting the form values - team_two_faction
    var s_team_two_faction = this.state.currentMatchData.team_two_faction;  
    //console.log('this.state.currentMatchData.team_two_faction:' + s_team_two_faction);
         
    var jq_team_two_faction = $("#team_two_faction").val();  
    //console.log('jq_team_two_faction:' + jq_team_two_faction);
    
    var f_team_two_faction = "";
    if (typeof s_team_two_faction != 'undefined' && s_team_two_faction) {
        f_team_two_faction = s_team_two_faction;
    } else {
        if (typeof jq_team_two_faction != 'undefined' && jq_team_two_faction) {
          f_team_two_faction = jq_team_two_faction;
        }
    } 
    //console.log('f_team_two_faction:' + f_team_two_faction);  
    
     // getting the form values - team_two_score
    var s_team_two_score = this.state.currentMatchData.team_two_score;  
    //console.log('this.state.currentMatchData.team_two_score:' + s_team_two_score);
         
    var jq_team_two_score = $("#team_two_score").val();  
    //console.log('jq_team_two_score:' + jq_team_two_score);
    
    var f_team_two_score = "";
    if (typeof s_team_two_score != 'undefined' && s_team_two_score) {
        f_team_two_score = s_team_two_score;
    } else {
        if (typeof jq_team_two_score != 'undefined' && jq_team_two_score) {
          f_team_two_score = jq_team_two_score;
        }
    } 
    //console.log('f_team_two_score:' + f_team_two_score); 
    
    // getting the form values - winner ** old method
/*
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
*/  
    //auto determin winner or draw
    var team_one_id = this.state.matchData.team_one.id;  
    var team_two_id = this.state.matchData.team_two.id; 
    //console.log('team_one_id:' + team_one_id);  
    //console.log('team_two_id:' + team_two_id);  
    var f_winnerEnd = "";
    if ( f_team_one_score == f_team_two_score ) {
      //if tie no winner
      f_winnerEnd = null;
    } else if ( f_team_two_score > f_team_one_score ) {
      f_winnerEnd = team_two_id;
    } else if ( f_team_one_score > f_team_two_score ) {
      f_winnerEnd = team_one_id;
    } 
    //console.log('f_winnerEnd:' + f_winnerEnd);    
        
     
    const postObj = {
      matchid: this.props.valueProps.match,
      roomcode: f_roomcode,
      gamemode: f_gamemode,
      gamemap: f_gamemap,
      team_one_faction: f_team_one_faction,
      team_one_score: f_team_one_score,
      team_two_faction: f_team_two_faction,
      team_two_score: f_team_two_score,
      winner: f_winnerEnd,
      active: 'false',
      ended: 'true'
    } 

    console.log('POST MATCH END');       
/*    console.log('matchid:' + this.props.valueProps.match);  
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
*/      
    this.props.updateMatch( postObj );
    
//    console.log('step4 afer update post valueProps:');
//    console.log(this.props);

    //clear state
/*
    this.setState({
        matchData: [] 
    });
*/    
    
  };
  

  render() {
    const { valueProps, handleChange } = this.props;
     
    //console.log('step4 Match Admin: valueProps.match:');
    //console.log(this.props.match);
    
    var jsonQuery = require('json-query');
    
    //form default values    
    var default_gamemode;
    if ( this.props.match.gamemode == null || this.props.match.gamemode.id == null ) {
        default_gamemode = null;
    } else {
        default_gamemode = this.props.match.gamemode.id;
    } 
    //console.log('default_gamemode:' + String(default_gamemode) );  

    //gamemap   
    var default_gamemap;
    if ( this.props.match.gamemap == null || this.props.match.gamemap.id == null ) {
        default_gamemap = null;
    } else {
        default_gamemap = this.props.match.gamemap.id;
    } 
    //console.log('default_gamemap:' + String(default_gamemap) );  
    
    //this.props.match.team_one_faction.id
    var default_team_one_faction;
    if ( this.props.match.team_one_faction == null || this.props.match.team_one_faction.id == null ) {
        default_team_one_faction = null;
    } else {
        default_team_one_faction = this.props.match.team_one_faction.id;
    } 
    //console.log('default_team_one_faction:' + String(default_team_one_faction) );
    
    //this.props.match.team_one_faction.id
    var default_team_two_faction;
    if ( this.props.match.team_two_faction == null || this.props.match.team_two_faction.id == null ) {
        default_team_two_faction = null;
    } else {
        default_team_two_faction = this.props.match.team_two_faction.id;
    } 
    //console.log('default_team_two_faction:' + String(default_team_two_faction) );
        
    //this.props.match.winner.id
    var default_winner;
    if ( this.props.match.winner == null || this.props.match.winner.id == null ) {
        default_winner = null;
    } else {
        default_winner = this.props.match.winner.id;
    } 
    //console.log('default_winner:' + String(default_winner) );

    // tournament info
    var tournament_name_value = jsonQuery('series.tournament.name', { data: this.props.match }).value;
    var tournament_scheduled_date = jsonQuery('series.tournament.scheduled_date', { data: this.props.match }).value;
    var dateFormat = require('dateformat');
    tournament_scheduled_date = dateFormat(tournament_scheduled_date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    
    // series info
    var series_name = jsonQuery('[id=' + this.props.valueProps.match + '].series.name', { data: this.props.matchesdetails }).value;
    var series_order = jsonQuery('[id=' + this.props.valueProps.match + '].series.series_order', { data: this.props.matchesdetails }).value;
    var series_best_of = jsonQuery('[id=' + this.props.valueProps.match + '].series.best_of', { data: this.props.matchesdetails }).value;
    var series_active = jsonQuery('[id=' + this.props.valueProps.match + '].series.active', { data: this.props.matchesdetails }).value;  
    var series_ended = jsonQuery('[id=' + this.props.valueProps.match + '].series.ended', { data: this.props.matchesdetails }).value;

    // match info
    var match_match_order = jsonQuery('match_order', { data: this.props.match }).value;
    var match_active = jsonQuery('active', { data: this.props.match }).value;    
    var match_ended = jsonQuery('ended', { data: this.props.match }).value;     
    //match info that updates
    var match_match_winner = jsonQuery('winner.id', { data: this.props.match }).value;
    if ( ( match_match_winner == "") || (match_match_winner == null ) ) { 
      match_match_winner = jsonQuery('winner', { data: this.props.match }).value;
    }
    
    var match_team_one_faction_id = jsonQuery('[id=' + this.props.valueProps.match + '].team_one_faction', { data: this.props.matches }).value;
    var match_team_two_faction_id = jsonQuery('[id=' + this.props.valueProps.match + '].team_two_faction', { data: this.props.matches }).value;
    var match_team_one_faction_htmlcolor = jsonQuery('[id=' + match_team_one_faction_id + '].htmlcolorvalue', { data: this.props.gamefactions }).value;
    var match_team_two_faction_htmlcolor = jsonQuery('[id=' + match_team_two_faction_id + '].htmlcolorvalue', { data: this.props.gamefactions }).value;
   
    var match_team_one_id = jsonQuery('[id=' + this.props.valueProps.match + '].team_one', { data: this.props.matches }).value; 
    var match_team_one_name = jsonQuery('[id=' + match_team_one_id + '].short_name', { data: this.props.teams }).value;
    var match_team_one_image = jsonQuery('[id=' + match_team_one_id + '].logo', { data: this.props.teams }).value;
    var match_team_two_id = jsonQuery('[id=' + this.props.valueProps.match + '].team_two', { data: this.props.matches }).value; 
    var match_team_two_name = jsonQuery('[id=' + match_team_two_id + '].short_name', { data: this.props.teams }).value;
    var match_team_two_image = jsonQuery('[id=' + match_team_two_id + '].logo', { data: this.props.teams }).value;

    var match_gamemode_id = jsonQuery('[id=' + this.props.valueProps.match + '].gamemode', { data: this.props.matches }).value; 
    var match_gamemode_name = jsonQuery('[id=' + match_gamemode_id + '].name', { data: this.props.gamemodes }).value;
    var match_gamemap_id = jsonQuery('[id=' + this.props.valueProps.match + '].gamemap', { data: this.props.matches }).value;
    var match_gamemap_name = jsonQuery('[id=' + match_gamemap_id + '].name', { data: this.props.gamemaps }).value;
   //players
   var players_team_one_object = jsonQuery('[*team=' + match_team_one_id + '][*enabled=true]', { data: this.props.players }).value; 
   var players_team_two_object = jsonQuery('[*team=' + match_team_two_id + '][*enabled=true]', { data: this.props.players }).value; 

   //players stats [*match=2][*team=2]
   var playerstats_team_one_object = jsonQuery('[*match=' + this.props.valueProps.match + '][*team=' + match_team_one_id + ']', { data: this.props.playerstats }).value; 
   var playerstats_team_two_object = jsonQuery('[*match=' + this.props.valueProps.match + '][*team=' + match_team_two_id + ']', { data: this.props.playerstats }).value; 
      
   //game
   var game_id = this.props.valueProps.game;
   var game_name = this.props.valueProps.gameName;  
   
    return (
    <React.Fragment>
        
		<main className="page-content">
			<div className="container-fluid">
    		<div class="row">
    			<div class="col-md-6 card card-body">
          
  					<form onSubmit={this.onSubmit.bind(this)}>
  						<div className="row">
  							<div className="col-md-8">
                  <h2>Match Editor</h2>
                  <p>Match Number <span className="text-warning font-weight-bold">{ match_match_order }</span> of <span className="text-warning font-weight-bold">{ series_name }</span> Series</p>                  
  							</div>
  							<div className="col-md-4 text-right">
  								<button type="button" className="btn btn-primary btn-lg btn btn-deep-purple waves-effect waves-light mx-0 my-0" onClick={this.back}>Back</button>                              
  							</div>
  						</div>
  
  						<div className="row">	
  							<div className="col-md-12">
  								<div className="form-group">
  									<label className="col-form-label col-form-label-lg">Room Code</label>
  								   <input
                        id="roomcode"
                        className="form-control"
                        type="text"
                        name="roomcode"
                        onChange={(e) => {
                        let { currentMatchData } = this.state;
                        currentMatchData.roomcode = e.target.value;
                        //console.log("e.target.value:" + e.target.value);
                        //console.log("currentMatchData.roomcode:" + currentMatchData.roomcode );
                        this.setState({ currentMatchData });
                        }}
                        defaultValue={ this.props.match.roomcode }
                      />
  								</div>
  							</div>
  						</div>
  
  						<div className="row">	
  							<div className="col-md-6">
  								<div className="form-group">
  									<label className="col-form-label col-form-label-lg">Game Mode</label>
     								 <select id="gamemode" name="gamemode" className="form-control custom-select" 
                       onChange={(e) => {
                      let { currentMatchData } = this.state;
                      currentMatchData.winner = e.target.value;
                      //console.log("e.target.value:" + e.target.value);
                      //console.log("currentMatchData.gamemode:" + currentMatchData.gamemode );
                      this.setState({ currentMatchData });          
                      }}
                      defaultValue={ default_gamemode }
                       >
                      <option value="">Select Game Mode</option>
                        {this.props.gamemodes.map(gmode => (
                        <option key={gmode.id} value={gmode.id}>{gmode.name}</option>
                       ))}
                      </select>
  								</div>
  							</div>
  							<div className="col-md-6">
  								<div className="form-group">
  									<label className="col-form-label col-form-label-lg">Game Map</label>
                     <select id="gamemap" name="gamemap" className="form-control custom-select" 
                       onChange={(e) => {
                      let { currentMatchData } = this.state;
                      currentMatchData.winner = e.target.value;
                      //console.log("e.target.value:" + e.target.value);
                      //console.log("currentMatchData.gamemap:" + currentMatchData.gamemap );
                      this.setState({ currentMatchData });          
                      }}
                      defaultValue={ default_gamemap }
                       >
                      <option value="">Select Game Map</option>
                        {this.props.gamemaps.map(gmap => (
                        <option key={gmap.id} value={gmap.id}>{gmap.name}</option>
                       ))}
                     </select>
  								</div>
  							</div>
  						</div>
  						 
  						<div className="row d-flex justify-content-center">	
                <div className="col-md-4 match-editor-border">
                	
                  <div className={`${'text-center mt-3 pt-2'} ${match_team_one_faction_htmlcolor}`}>
                  { match_team_one_id == match_match_winner ?
                  <span>
                    <h5 class="text-warning font-weight-bold fa-blink">WINNER!</h5>   
                    <h4 className="font-weight-bold fa-blink">{ match_team_one_name }</h4>
                    <img className="card--body__img card-img-top pb-2 fa-blink" src={match_team_one_image} alt={ match_team_one_name } aria-label={ match_team_one_name } />
                  </span>
                  :
                  <span>
                    <h4 className="font-weight-bold">{ match_team_one_name }</h4>
                    <img className="card--body__img card-img-top pb-2 " src={match_team_one_image} alt={ match_team_one_name } aria-label={ match_team_one_name } />
                  </span>
                  } 
                  </div>                                

                  <div className="form-group">
  									<label className="col-form-label col-form-label-lg">Team One Faction</label>
                    <select id="team_one_faction" name="team_one_faction" className="form-control custom-select" 
                     onChange={(e) => {
                    let { currentMatchData } = this.state;
                    currentMatchData.team_one_faction = e.target.value;
                    //console.log("e.target.value:" + e.target.value);
                    //console.log("currentMatchData.team_one_faction:" + currentMatchData.team_one_faction );
                    this.setState({ currentMatchData });          
                    }}
                    defaultValue={ default_team_one_faction }
                     >
                    <option value="">Select Team One Faction</option>
                      {this.props.gamefactions.map(gfaction => (
                      <option key={gfaction.id} value={gfaction.id}>{gfaction.name}</option>
                     ))}
                    </select>
  								</div>
  								<div className="form-group">
  									<label className="col-form-label col-form-label-lg">Team One Score</label>
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
                      //console.log("e.target.value:" + e.target.value);
                      //console.log("currentMatchData.team_one_score:" + currentMatchData.team_one_score );
                      this.setState({ currentMatchData });          
                      }}
                      defaultValue={ this.props.match.team_one_score }              
                    /> 
                  </div>                                                   
  							</div>
  							<div className="col-md-2 vertical-align-ultimate text-center">
  							<i className="fas fa-times fa-7x"></i>
  							</div>
                <div className="col-md-4 match-editor-border">
                	
                  <div className={`${'text-center mt-3 pt-2'} ${match_team_two_faction_htmlcolor}`}>
                  { match_team_two_id == match_match_winner ?
                  <span>
                    <h5 class="text-warning font-weight-bold fa-blink">WINNER!</h5>
                    <h4 className="font-weight-bold fa-blink">{ match_team_two_name }</h4>
                    <img className="card--body__img card-img-top pb-2 fa-blink" src={match_team_two_image} alt={ match_team_two_name } aria-label={ match_team_two_name } />   
                  </span>
                  :
                  <span>
                    <h4 className="font-weight-bold">{ match_team_two_name }</h4>
                    <img className="card--body__img card-img-top pb-2" src={match_team_two_image} alt={ match_team_two_name } aria-label={ match_team_two_name } />
                  </span>
                  } 
                  </div>  
         
                  <div className="form-group">
  									<label className="col-form-label col-form-label-lg">Team Two Faction</label>
                    <select id="team_two_faction" name="team_two_faction" className="form-control custom-select" 
                     onChange={(e) => {
                    let { currentMatchData } = this.state;
                    currentMatchData.team_two_faction = e.target.value;
                    //console.log("e.target.value:" + e.target.value);
                    //console.log("currentMatchData.team_two_faction:" + currentMatchData.team_two_faction );
                    this.setState({ currentMatchData });          
                    }}
                    defaultValue={ default_team_two_faction }
                     >
                    <option value="">Select Team Two Faction</option>
                      {this.props.gamefactions.map(gfaction => (
                      <option key={gfaction.id} value={gfaction.id}>{gfaction.name}</option>
                     ))}
                    </select>
  								</div>
  								<div className="form-group">
  									<label className="col-form-label col-form-label-lg">Team Two Score</label>
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
                    //console.log("e.target.value:" + e.target.value);
                    //console.log("currentMatchData.team_two_score:" + currentMatchData.team_two_score );
                    this.setState({ currentMatchData });          
                    }}
                    defaultValue={ this.props.match.team_two_score }              
                    />
                  </div>                                                 
  							</div>
  						</div>
  						 
  

                      
  						<div className="row mt-3">								
  							<div className="col-md-6">
  								<button type="submit" className="btn btn-primary btn-lg btn btn-dark-green waves-effect waves-light btn-block mx-0 my-0">Update Match</button>
  							</div>
  							<div className="col-md-6">
  								<button className="btn btn-primary btn-lg btn btn-danger waves-effect waves-light btn-block mx-0 my-0" onClick={this.endMatchForm}>End Match</button>		
  							</div>
  						</div>
  					</form>
            
            </div>

      			<div className="col-md-6 card card-body">
      				
      				<div className="col-md-12">
      					<div className="row">
      						<div className="col-md-7">
      							<h3>Team One <span className="text-warning font-weight-bold">{ match_team_one_name }</span> Players</h3>
      						</div>
      						<div className="col-md-5">
      							<div className="row text-right">
      								<form className="form-inline">
      								  <div className="form-group">
        									<label for="winner" className="sr-only">Add Team One Player</label>
        									<select id="team_one_addplayer" name="player" className="form-control form-control-sm custom-select form-control-sm-truefalse" 
                          onChange={(e) => {
                          e.preventDefault();
                          let { playerAddTeamOne } = this.state;
                          playerAddTeamOne.player = e.target.value;
                          playerAddTeamOne.match = this.props.valueProps.match;
                          playerAddTeamOne.game = game_id;
                          playerAddTeamOne.gamemap = match_gamemap_id;
                          playerAddTeamOne.gamemode = match_gamemode_id;
                          playerAddTeamOne.team = match_team_one_id;
                          playerAddTeamOne.series = this.props.valueProps.series;
                          playerAddTeamOne.tournament = this.props.valueProps.tournament;                           
                          //console.log("e.target.value:" + e.target.value);
                          //console.log("playerAdd:" + currentMatchData.gamemode );
                          this.setState({ playerAddTeamOne });
                          }}
                          defaultValue={ null }
                          >
                          <option value="">Select Team One Player</option>
                            {players_team_one_object.map(pmap => (
                            <option key={pmap.id} value={pmap.id}>{pmap.username}</option>
                          ))}
                          </select>
                        
                          <button
                          onClick={(e) => {
                          e.preventDefault();
                          let { playerAddTeamOne } = this.state;
                          //console.log("playerAdd:" + playerAdd);
                          var dataPlayerAddTeamOne = JSON.stringify( playerAddTeamOne ); 
                          dataPlayerAddTeamOne = JSON.parse(dataPlayerAddTeamOne);    
                          //console.log("return all add player obj records");
                          //console.log(dataPlayerAddTeamOne);
                          this.props.addPlayerStats( dataPlayerAddTeamOne );
                          }}
                          className="ml-2 btn btn-primary btn-sm btn btn-deep-purple waves-effect waves-light">Add Player
                          </button>
    								    </div>
      								                                                 
      								</form>
      							</div>
      						</div>
      					</div>
      
      
      					<div className="table-responsive">
      						<table className="table table-striped">
      							<thead>                                            
      								<tr>
      									<th>Username</th>
      									<th className="text-center">Kills</th>
      									<th className="text-center">Deaths</th>
      									<th className="text-center">Assist</th>
      									<th className="text-center">Goals</th>
      									<th className="text-center">Grabs</th>
      									<th className="text-center">Drops</th>
      									<th className="text-center">Score</th>
      									<th className="text-center">Captain</th>
      									<th className="text-center">Delete</th>
      									<th className="text-center">Update</th>
      								</tr>
      							</thead>
      							<tbody>
                      {playerstats_team_one_object.map(listplayers => (
                      <tr key={listplayers.id} className={ listplayers.is_captain ? 'table-dark' : '' }>
                        <td>{ listplayers.is_captain ? <i className="fas fa-crown font-weight-bold text-warning"></i> : '' } { jsonQuery('[id=' + listplayers.player + '].username', { data: this.props.players }).value }</td>
                        <td className="text-center">
                          <input
                          id={ 'ptone-kills-' + listplayers.id }
                          name={ 'ptone-kills-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.kills }              
                          /> 
                        </td>
                        <td className="text-center">
                          <input
                          id={ 'ptone-deaths-' + listplayers.id }
                          name={ 'ptone-deaths-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.deaths }              
                          /> 
                        </td>
                         <td className="text-center">
                          <input
                          id={ 'ptone-assist-' + listplayers.id }
                          name={ 'ptone-assist-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.assist }              
                          /> 
                        </td>
                        <td className="text-center">
                          <input
                          id={ 'ptone-goals-' + listplayers.id }
                          name={ 'ptone-goals-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.goals }              
                          /> 
                        </td>                        
                        <td className="text-center">
                          <input
                          id={ 'ptone-grabs-' + listplayers.id }
                          name={ 'ptone-grabs-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.grabs }              
                          /> 
                        </td> 
                        <td className="text-center">
                          <input
                          id={ 'ptone-drops-' + listplayers.id }
                          name={ 'ptone-drops-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.drops }              
                          /> 
                        </td>                                                     
                        <td className="text-center">
                          <input
                          id={ 'ptone-score-' + listplayers.id }
                          name={ 'ptone-score-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.score }              
                          /> 
                        </td>                     
                       <td className="text-center"> 
                          <select
                          id={ 'ptone-is_captain-' + listplayers.id }
                          name={ 'ptone-is_captain-' + listplayers.id }
                          className="form-control form-control-sm form-control-sm-truefalse custom-select" 
                          defaultValue={ String(listplayers.is_captain) }
                          >
      										  <option value="false">no</option>
      											<option value="true">yes</option>
                           ))}                                                                                
      										</select>                    
                        </td>
                        <td className="text-center">
                          <button
                          onClick={(e) => {
                          //e.preventDefault();
                          this.props.deletePlayerStats(listplayers.id);
                          }}
                          className="btn btn-danger btn-sm btn-danger waves-effect waves-light btn-nomargin">Delete
                          </button>
                        </td>
      									<td className="text-center">
                          <button
                          onClick={(e) => {
                          e.preventDefault();
                          var ptone_kills  = $("#ptone-kills-" + listplayers.id ).val();
                          var ptone_deaths = $("#ptone-deaths-" + listplayers.id ).val();
                          var ptone_assist = $("#ptone-assist-" + listplayers.id ).val();
                          var ptone_goals = $("#ptone-goals-" + listplayers.id ).val();
                          var ptone_grabs = $("#ptone-grabs-" + listplayers.id ).val();
                          var ptone_drops = $("#ptone-drops-" + listplayers.id ).val();
                          var ptone_score = $("#ptone-score-" + listplayers.id ).val();
                          var ptone_is_captain = $("#ptone-is_captain-" + listplayers.id ).val();  
                          /*console.log("update listplayers.id:" + listplayers.id);
                          console.log('ptone_kills:' + ptone_kills);
                          console.log('ptone_deaths:' + ptone_deaths);
                          console.log('ptone_assist:' + ptone_assist);
                          console.log('ptone_goals:' + ptone_goals);
                          console.log('ptone_grabs:' + ptone_grabs);
                          console.log('ptone_drops:' + ptone_drops);
                          console.log('ptone-score:' + ptone_score);
                          console.log('ptone_is_captain:' + ptone_is_captain);
                           */
                           //  gamemap
                          var ptone_default_gamemap = "";
                          if (typeof this.props.match.gamemap.id != 'undefined' && this.props.match.gamemap.id) {
                              ptone_default_gamemap = this.props.match.gamemap.id;
                          } else {
                              if (typeof this.props.match.gamemap != 'undefined' && this.props.match.gamemap) {
                                ptone_default_gamemap = this.props.match.gamemap;
                              }
                          } 
                          //console.log('ptone_default_gamemap:' + ptone_default_gamemap);  
                          // gamemode 
                          var ptone_default_gamemode = "";
                          if (typeof this.props.match.gamemode.id != 'undefined' && this.props.match.gamemode.id) {
                              ptone_default_gamemode = this.props.match.gamemode.id;
                          } else {
                              if (typeof this.props.match.gamemode != 'undefined' && this.props.match.gamemode) {
                                ptone_default_gamemode = this.props.match.gamemode;
                              }
                          } 
                          //console.log('ptone_default_gamemode:' + ptone_default_gamemode);  
                  
                          const postPlayerTeamOneObj = {
                            playerstatsid: listplayers.id,
                            series: listplayers.series,
                            tournament: listplayers.tournament,                            
                            is_captain: ptone_is_captain,
                            score: ptone_score,
                            kills: ptone_kills,
                            deaths: ptone_deaths,
                            assist: ptone_assist,
                            goals: ptone_goals,
                            grabs: ptone_grabs,
                            drops: ptone_drops,
                            match: listplayers.match,
                            player: listplayers.player,
                            team: listplayers.team,
                            game: game_id,
                            gamemode: ptone_default_gamemode,
                            gamemap: ptone_default_gamemap
                          }
 
                          this.props.updatePlayerStats( postPlayerTeamOneObj );
                          console.log('postPlayerTeamOneObj:' + JSON.stringify(postPlayerTeamOneObj) );
                          }}
                          className="btn btn-primary btn-sm btn-dark-green waves-effect waves-light btn-nomargin">Update
                          </button>                                              
                        </td>
                      </tr>
                      ))}
 
      							</tbody>
      						</table>
      					</div>
 
 

     					<div className="row">
      						<div className="col-md-7">
      							<h3>Team Two <span className="text-warning font-weight-bold">{ match_team_two_name }</span> Players</h3>
      						</div>
      						<div className="col-md-5">
      							<div className="row text-right">
      								<form className="form-inline">
      								  <div className="form-group">
        									<label for="winner" className="sr-only">Add Team Two Player</label>
        									<select id="team_two_addplayer" name="player" className="form-control form-control-sm custom-select form-control-sm-truefalse" 
                          onChange={(e) => {
                          e.preventDefault();
                          let { playerAddTeamTwo } = this.state;
                          playerAddTeamTwo.player = e.target.value;
                          playerAddTeamTwo.match = this.props.valueProps.match;
                          playerAddTeamTwo.game = game_id;
                          playerAddTeamTwo.gamemap = match_gamemap_id;
                          playerAddTeamTwo.gamemode = match_gamemode_id;
                          playerAddTeamTwo.team = match_team_two_id;
                          playerAddTeamTwo.series = this.props.valueProps.series;
                          playerAddTeamTwo.tournament = this.props.valueProps.tournament;                            
                          //console.log("e.target.value:" + e.target.value);
                          //console.log("playerAdd:" + currentMatchData.gamemode );
                          this.setState({ playerAddTeamTwo });
                          }}
                          defaultValue={ null }
                          >
                          <option value="">Select Team Two Player</option>
                            {players_team_two_object.map(pmap => (
                            <option key={pmap.id} value={pmap.id}>{pmap.username}</option>
                          ))}
                          </select>
                        
                          <button
                          onClick={(e) => {
                          e.preventDefault();
                          let { playerAddTeamTwo } = this.state;
                          //console.log("playerAdd:" + playerAdd);
                          var dataPlayerAddTeamTwo = JSON.stringify( playerAddTeamTwo ); 
                          dataPlayerAddTeamTwo = JSON.parse(dataPlayerAddTeamTwo);    
                          console.log("return all add player obj records");
                          console.log(dataPlayerAddTeamTwo);
                          this.props.addPlayerStats( dataPlayerAddTeamTwo );
                          }}
                          className="ml-2 btn btn-primary btn-sm btn btn-deep-purple waves-effect waves-light">Add Player
                          </button>
    								    </div>
      								                                                 
      								</form>
      							</div>
      						</div>
      					</div>
      
      
      					<div className="table-responsive">
      						<table className="table table-striped">
      							<thead>                                            
      								<tr>
      									<th>Username</th>
      									<th className="text-center">Kills</th>
      									<th className="text-center">Deaths</th>
      									<th className="text-center">Assist</th>
      									<th className="text-center">Goals</th>
      									<th className="text-center">Grabs</th>
      									<th className="text-center">Drops</th>
      									<th className="text-center">Score</th>
      									<th className="text-center">Captain</th>
      									<th className="text-center">Delete</th>
      									<th className="text-center">Update</th>
      								</tr>
      							</thead>
      							<tbody>
                      {playerstats_team_two_object.map(listplayers => (
                      <tr key={listplayers.id} className={ listplayers.is_captain ? 'table-dark' : '' }>
                        <td>{ listplayers.is_captain ? <i className="fas fa-crown font-weight-bold text-warning"></i> : '' } { jsonQuery('[id=' + listplayers.player + '].username', { data: this.props.players }).value }</td>
                        <td className="text-center">
                          <input
                          id={ 'pttwo-kills-' + listplayers.id }
                          name={ 'pttwo-kills-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.kills }              
                          /> 
                        </td>
                        <td className="text-center">
                          <input
                          id={ 'pttwo-deaths-' + listplayers.id }
                          name={ 'pttwo-deaths-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.deaths }              
                          /> 
                        </td>
                         <td className="text-center">
                          <input
                          id={ 'pttwo-assist-' + listplayers.id }
                          name={ 'pttwo-assist-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.assist }              
                          /> 
                        </td>
                        <td className="text-center">
                          <input
                          id={ 'pttwo-goals-' + listplayers.id }
                          name={ 'pttwo-goals-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.goals }              
                          /> 
                        </td>                        
                        <td className="text-center">
                          <input
                          id={ 'pttwo-grabs-' + listplayers.id }
                          name={ 'pttwo-grabs-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.grabs }              
                          /> 
                        </td> 
                        <td className="text-center">
                          <input
                          id={ 'pttwo-drops-' + listplayers.id }
                          name={ 'pttwo-drops-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.drops }              
                          /> 
                        </td>                                                     
                        <td className="text-center">
                          <input
                          id={ 'pttwo-score-' + listplayers.id }
                          name={ 'pttwo-score-' + listplayers.id }
                          className="form-control form-control-sm"
                          type="number"
                          min="0" 
                          step="1"
                          onChange={(e) => {
                          //console.log("e.target.value:" + e.target.value);
                          }}
                          defaultValue={ listplayers.score }              
                          /> 
                        </td>                     
                       <td className="text-center"> 
                          <select
                          id={ 'pttwo-is_captain-' + listplayers.id }
                          name={ 'pttwo-is_captain-' + listplayers.id }
                          className="form-control form-control-sm form-control-sm-truefalse custom-select" 
                          defaultValue={ String(listplayers.is_captain) }
                          >
      										  <option value="false">no</option>
      											<option value="true">yes</option>
                           ))}                                                                                
      										</select>                    
                        </td>
                        <td className="text-center">
                          <button
                          onClick={(e) => {
                          //e.preventDefault();
                          this.props.deletePlayerStats(listplayers.id);
                          }}
                          className="btn btn-danger btn-sm btn-danger waves-effect waves-light btn-nomargin">Delete
                          </button>
                        </td>
      									<td className="text-center">
                          <button
                          onClick={(e) => {
                          e.preventDefault();
                          var pttwo_kills  = $("#pttwo-kills-" + listplayers.id ).val();
                          var pttwo_deaths = $("#pttwo-deaths-" + listplayers.id ).val();
                          var pttwo_assist = $("#pttwo-assist-" + listplayers.id ).val();
                          var pttwo_goals = $("#pttwo-goals-" + listplayers.id ).val();
                          var pttwo_grabs = $("#pttwo-grabs-" + listplayers.id ).val();
                          var pttwo_drops = $("#pttwo-drops-" + listplayers.id ).val();
                          var pttwo_score = $("#pttwo-score-" + listplayers.id ).val();
                          var pttwo_is_captain = $("#pttwo-is_captain-" + listplayers.id ).val();  
                          //console.log("update listplayers.id:" + listplayers.id);
                          //console.log('pttwo_kills:' + pttwo_kills);
                          //console.log('pttwo_deaths:' + pttwo_deaths);
                          //console.log('pttwo_assist:' + pttwo_assist);
                          //console.log('pttwo_goals:' + pttwo_goals);
                          //console.log('pttwo_grabs:' + pttwo_grabs);
                          //console.log('pttwo_drops:' + pttwo_drops);
                          //console.log('ptone-score:' + pttwo_score);
                          //console.log('pttwo_is_captain:' + pttwo_is_captain);
 
                           //  gamemap
                          var pttwo_default_gamemap = "";
                          if (typeof this.props.match.gamemap.id != 'undefined' && this.props.match.gamemap.id) {
                              pttwo_default_gamemap = this.props.match.gamemap.id;
                          } else {
                              if (typeof this.props.match.gamemap != 'undefined' && this.props.match.gamemap) {
                                pttwo_default_gamemap = this.props.match.gamemap;
                              }
                          } 
                          //console.log('pttwo_default_gamemap:' + pttwo_default_gamemap);  
                          // gamemode 
                          var pttwo_default_gamemode = "";
                          if (typeof this.props.match.gamemode.id != 'undefined' && this.props.match.gamemode.id) {
                              pttwo_default_gamemode = this.props.match.gamemode.id;
                          } else {
                              if (typeof this.props.match.gamemode != 'undefined' && this.props.match.gamemode) {
                                pttwo_default_gamemode = this.props.match.gamemode;
                              }
                          } 
                          //console.log('pttwo_default_gamemode:' + pttwo_default_gamemode);  
                  
                          const postPlayerTeamTwoObj = {
                            playerstatsid: listplayers.id,
                            series: listplayers.series,
                            tournament: listplayers.tournament,
                            is_captain: pttwo_is_captain,
                            score: pttwo_score,
                            kills: pttwo_kills,
                            deaths: pttwo_deaths,
                            assist: pttwo_assist,
                            goals: pttwo_goals,
                            grabs: pttwo_grabs,
                            drops: pttwo_drops,
                            match: listplayers.match,
                            player: listplayers.player,
                            team: listplayers.team,
                            game: game_id,
                            gamemode: pttwo_default_gamemode,
                            gamemap: pttwo_default_gamemap
                          }
 
                          this.props.updatePlayerStats( postPlayerTeamTwoObj );
                          console.log('postPlayerTeamOneObj:' + JSON.stringify(postPlayerTeamTwoObj) );
                          }}
                          className="btn btn-primary btn-sm btn-dark-green waves-effect waves-light btn-nomargin">Update
                          </button>                                              
                        </td>
                      </tr>
                      ))}
 
      							</tbody>
      						</table>
      					</div>

 
       
      				</div>
      				
      			</div>
      


                
  				</div>
        </div>

				{ this.props.valueProps.series ?
        <div className="container-fluid">
          <div className="col-md-12 m-auto card card-body mt-4 mb-4 ">
  					<h3>Best of <span className="text-warning font-weight-bold">{ series_best_of }</span> Matches for <span className="text-warning font-weight-bold">{ series_name }</span> Series</h3>
  					<div className="table-responsive">
            <table className="table table-striped">
  						<thead>
  							<tr>
  								<th className="text-center">ID</th>
  								<th className="text-center">Match #</th>
  								<th>Match Winner</th>
  								<th className="text-center">{ match_team_one_name } Score</th>
  								<th className="text-center">{ match_team_two_name } Score</th>
  								<th>Game Mode</th>
  								<th>Game Map</th>
                  <th>Room Code</th>
                  <th className="text-center">Ended</th>
  								<th className="text-center">Active</th>
  							  
                </tr>
  						</thead>
              <tbody>
              {this.props.matches.map(listmatch => (
                <tr key={listmatch.id} className={ this.props.valueProps.match == listmatch.id ? 'table-dark' : '' }>
                  <td className="text-center">{listmatch.id}</td>
                  
                  <td className="text-center">{listmatch.match_order}</td>
                  { ( (listmatch.team_one_score  == listmatch.team_two_score) && (String(listmatch.active) == 'false') ) ?
                  <td>Draw/Tie</td>
                  :
                  <td>{ jsonQuery('[id=' + listmatch.winner + '].short_name', { data: this.props.teams }).value }</td>
                  }
                                                                        
                  <td className={`${'text-center'} ${ jsonQuery('[id=' + listmatch.team_one_faction + '].htmlcolorvalue', { data: this.props.gamefactions }).value }`} >{ listmatch.team_one_score }</td>  
                  <td className={`${'text-center'} ${ jsonQuery('[id=' + listmatch.team_two_faction + '].htmlcolorvalue', { data: this.props.gamefactions }).value }`} >{ listmatch.team_two_score }</td>  
                  <td>{ jsonQuery('[id=' + listmatch.gamemode + '].name', { data: this.props.gamemodes }).value } </td>
                  <td>{ jsonQuery('[id=' + listmatch.gamemap + '].name', { data: this.props.gamemaps }).value } </td>   
                  <td>{listmatch.roomcode}</td>
                  <td className="text-center">{ String(listmatch.ended) == 'true' ? <i className="fas fa-check fa-lg green-text"></i> : <i className="fas fa-times fa-lg red-text"></i> }</td>
                  <td className="text-center">{ String(listmatch.active) == 'true' ? <i className="fa fa-circle fa-lg fa-blink green-text"></i> : <i className="fa fa-circle fa-lg red-text"></i> }</td>
                </tr>
              ))}
              </tbody>
  					</table>
            </div>
  				</div>
        </div>
        : 
        <div>
            <h2>No Matches Created for this Series</h2>
        </div>         
        }
        
		</main>
     
    </React.Fragment>

    );
  }
}
const mapStateToProps = state => ({
  match: state.match.match,
  matches: state.matches.matches,
  matchesdetails: state.matchesdetails.matchesdetails,  
  teams: state.teams.teams,
  gamemaps: state.gamemaps.gamemaps,
  gamemodes: state.gamemodes.gamemodes,
  gamefactions: state.gamefactions.gamefactions,
  players: state.players.players,
  playerstats: state.playerstats.playerstats
});

export default connect( mapStateToProps,{ getMatch, getMatches, getMatchesDetails, updateMatch, getTeams, getGameMaps, getGameModes, getGameFactions, getPlayers, getPlayerStats, addPlayerStats, deletePlayerStats, updatePlayerStats } )(StepFourMatchAdminForm);
 