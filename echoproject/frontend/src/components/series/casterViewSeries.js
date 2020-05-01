import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches, getMatchesDetails } from "../../actions/matches";
import { getScenes, updateSceneActivate, updateSceneDeActivate } from "../../actions/scenes";
import { getSeries, getSeriesDetails, updateSeriesEnd } from "../../actions/series";
import { getTeams} from "../../actions/teams";
import { getGameMaps } from "../../actions/gamemaps";
import { getGameModes } from "../../actions/gamemodes";
import { getGameFactions } from "../../actions/gamefactions";
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';
import socketIOClient from "socket.io-client";

export class CasterViewSeries extends Component {

  componentDidMount() {
//    console.log("XXXXXXXXXX componentDidMount - casterViewSeries");
//    console.log('valueProps.seriesid');
//    console.log(this.props.valueProps.seriesid);
//    console.log('valueProps.tournament');
//    console.log(this.props.valueProps.tournament);
    
    
    this.props.getMatches(this.props.valueProps.seriesid);
    this.props.getSeries(this.props.valueProps.tournament);

    //this.timer = setInterval(()=>  this.props.getMatches(this.props.valueProps.seriesid), 5000);

    this.timer = setIntervalAsync( 
      async () => {
        console.log('fetch start');
        await this.props.getMatches(this.props.valueProps.seriesid);
        await this.props.getSeries(this.props.valueProps.tournament);
      },3000
    );
   
    this.props.getMatchesDetails(this.props.valueProps.seriesid);
    this.props.getSeriesDetails(this.props.valueProps.tournament);
    this.props.getScenes();
    this.props.getTeams();
    this.props.getGameMaps();
    this.props.getGameModes();
    this.props.getGameFactions();
        
  };
  
  componentWillUnmount() {
    clearIntervalAsync(this.timer);
    this.timer = null;
    console.log('fetch end');
  };
  
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
 
  //function to end series active to false, make sure all matches are done. calculates team scores and winner
  endSeriesForm = e => {
    e.preventDefault();
 
    //grab values to update series to activate, then go forward to edit page
    var f_jsonQuery = require('json-query');
    var f_seriesid = this.props.valueProps.seriesid;
    var f_series_name = f_jsonQuery('[id=' + f_seriesid + '].name', { data: this.props.series }).value;
//    var f_match_team_one_id = f_jsonQuery('[id=' + f_seriesid + '].team_one.id', { data: this.props.series }).value;
//    var f_match_team_two_id = f_jsonQuery('[id=' + f_seriesid + '].team_two.id', { data: this.props.series }).value;
    var f_match_team_one_id = f_jsonQuery('[id=' + f_seriesid + '].team_one', { data: this.props.series }).value;
    var f_match_team_two_id = f_jsonQuery('[id=' + f_seriesid + '].team_two', { data: this.props.series }).value;
    var f_tournamentid = this.props.valueProps.tournament;

    var f_team_one_score = 0;
    var f_team_two_score = 0;
    var f_winner = null;
    for (let [key, value] of Object.entries( this.props.matches )) {
      console.log(key + ' = ' + JSON.stringify(value) );
      console.log('id = ' + value.id );
      console.log('winner = ' + value.winner );
      if ( f_match_team_one_id == value.winner ) {
        f_team_one_score = f_team_one_score + 1;  
      };
      if ( f_match_team_two_id == value.winner ) {
        f_team_two_score = f_team_two_score + 1;  
      };
    }// for loop
    console.log('f_team_one_score:' + f_team_one_score);  
    console.log('f_team_two_score:' + f_team_two_score);   
    if ( f_team_one_score > f_team_two_score ) {
      f_winner = f_match_team_one_id;
    } else {
      f_winner = f_team_two_score;
    }
    console.log('f_winner:' + f_winner); 
        
     const postObj = {
      id: f_seriesid,
      tournament: f_tournamentid,
      name: f_series_name,
      team_one: f_match_team_one_id,
      team_one_score: f_team_one_score,
      team_two: f_match_team_two_id,
      team_two_score: f_team_two_score,
      winner: f_winner,
      active: 'false',
      ended: 'true'
    } 

    console.log('POST');       
/*    console.log('seriesid:' + f_seriesid);  
    console.log('tournament:' + f_tournamentid); 
    console.log('name:' + f_series_name); 
    console.log('team_one:' + f_match_team_one_id);  
    console.log('team_two:' + f_match_team_two_id);
*/
    console.log('series update: postObj:');
    console.log(postObj);
    
    //post and update series
    this.props.updateSeriesEnd( postObj );
 
    // Force a render without state change...
    //setTimeout( this.forceUpdate(), 4000);
  };
  
  
  static propTypes = {
    getSeries: PropTypes.func.isRequired,
    getSeriesDetails: PropTypes.func.isRequired,
    updateSeriesEnd: PropTypes.func.isRequired,
    getMatches: PropTypes.func.isRequired,
    getMatchesDetails: PropTypes.func.isRequired,
    getScenes: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired,
    getGameMaps: PropTypes.func.isRequired,
    getGameModes: PropTypes.func.isRequired,
    getGameFactions: PropTypes.func.isRequired,
    updateSceneActivate: PropTypes.func.isRequired, 
    updateSceneDeActivate: PropTypes.func.isRequired
  };


  render() {
 
    const { valueProps } = this.props;
    //console.log("render casterViewSeries caster view");
    //console.log('props');
    //console.log(this.props);
    //console.log('valueProps');
    //console.log(this.props.valueProps);
    //console.log("view:" + view);
    var jsonQuery = require('json-query');
 
   //get active match info 
    var match_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].id', { data: this.props.matches }).value;
    var match_roomcode = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].roomcode', { data: this.props.matches }).value;   
    var match_team_one_score = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].team_one_score', { data: this.props.matches }).value;
    var match_team_two_score = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].team_two_score', { data: this.props.matches }).value;
    var match_match_order = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].match_order', { data: this.props.matches }).value; 
    var match_active = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].active', { data: this.props.matches }).value;   
    var match_ended = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].ended', { data: this.props.matches }).value;     
    var match_team_one_faction_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].team_one_faction', { data: this.props.matches }).value; 
    var match_team_two_faction_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].team_two_faction', { data: this.props.matches }).value; 
    var match_team_one_faction_htmlcolor = jsonQuery('[id=' + match_team_one_faction_id + '].htmlcolorvalue', { data: this.props.gamefactions }).value;
    var match_team_two_faction_htmlcolor = jsonQuery('[id=' + match_team_two_faction_id + '].htmlcolorvalue', { data: this.props.gamefactions }).value;
    var match_team_one_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].team_one', { data: this.props.matches }).value; 
    var match_team_one_name = jsonQuery('[id=' + match_team_one_id + '].short_name', { data: this.props.teams }).value;
    var match_team_one_image = jsonQuery('[id=' + match_team_one_id + '].logo', { data: this.props.teams }).value;
    var match_team_two_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].team_two', { data: this.props.matches }).value; 
    var match_team_two_name = jsonQuery('[id=' + match_team_two_id + '].short_name', { data: this.props.teams }).value;
    var match_team_two_image = jsonQuery('[id=' + match_team_two_id + '].logo', { data: this.props.teams }).value;
    var match_winner_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].winner', { data: this.props.matches }).value;
    var match_winner_name = jsonQuery('[id=' + match_winner_id + '].short_name', { data: this.props.teams }).value;

    var match_gamemap_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].gamemap', { data: this.props.matches }).value;
    var match_gamemap_name = jsonQuery('[id=' + match_gamemap_id + '].name', { data: this.props.gamemaps }).value; 
    var match_gamemode_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].gamemode', { data: this.props.matches }).value;
    var match_gamemode_name = jsonQuery('[id=' + match_gamemode_id + '].name', { data: this.props.gamemodes }).value; 
    
   //if all matches in series ended return null to show END SERIES button
    var matches_still_not_ended = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][*ended=false].id', { data: this.props.matches }).value;
    
    return (
       
    <React.Fragment>
    <main className="page-content">
      <div className="container">  
        
         <div className="card card-body mt-4 mb-4">
            <h1>Caster View</h1>
<p>match_id: { match_id }</p>
<p>match_roomcode: { match_roomcode }</p>
<p>match_match_order: { match_match_order }</p>
<p>match_active: { String(match_active) }</p>
<p>match_ended: { String(match_ended) }</p>
<p>match_gamemap_name: { String(match_gamemap_name) }</p>
<p>match_gamemode_name: { String(match_gamemode_name) }</p>
 
<p>match_team_one_name: { match_team_one_name }</p>
<p>match_team_one_score: { match_team_one_score }</p>
<p>match_team_one_faction_htmlcolor: { match_team_one_faction_htmlcolor }</p>
<p>match_team_one_image: { match_team_one_image }</p>
 
<p>match_team_two_name: { match_team_two_name }</p>
<p>match_team_two_score: { match_team_two_score }</p>
<p>match_team_two_faction_htmlcolor: { match_team_two_faction_htmlcolor }</p>
<p>match_team_two_image: { match_team_two_image }</p>

 <p>match_winner_name: { match_winner_name }</p>
 <p>matches_still_not_ended: { matches_still_not_ended }</p>
 
           { matches_still_not_ended ?
           <div className="form-group">
              <button
              onClick={ this.endSeriesForm }
              className="btn btn-danger btn-sm disabled">End Series
              </button>
              <p>*All matche(s) in Series has not ended.</p> 
           </div>
           :
           <div className="form-group">  
              <button
              onClick={ this.endSeriesForm }
              className="btn btn-danger btn-sm">End Series
              </button>
           </div>
           }

              {this.props.valueProps.seriesid ?
                  <div class="empty">
          <h2>Current Matches for This Series</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Match Order</th>
                  <th>Room Code</th>
                  <th>Team One Score</th>
                  <th>Team Two Score</th>
                  <th>Match Winner</th>
                  <th>Ended</th>
                  <th>Active</th>
                   
                </tr>
              </thead>
              <tbody>
                {this.props.matches.map(listmatch => (
                  <tr key={listmatch.id} className={ match_id == listmatch.id ? 'table-success' : '' } >
                    <td>{listmatch.id}</td>
                    <td>{listmatch.match_order}</td>
                    <td>{listmatch.roomcode}</td>
                    <td>{listmatch.team_one_score}</td>
                    <td>{listmatch.team_two_score}</td>
                    <td>{String(listmatch.winner)}:{ jsonQuery('[id=' + listmatch.winner + '].name', { data: this.props.teams }).value } </td>
                    <td>{String(listmatch.ended)}</td>
                    <td>{String(listmatch.active)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
              : <div>
              <h2>No Matches Created for this Series</h2>
              </div>         
             }

             
             {this.props.valueProps.tournament ?
                  <div class="empty">
          <h2>Current Series for This Tournament</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Series Order</th>
                  <th># of Matches</th>
                  <th>Series Winner</th>
                  <th>Ended</th>
                  <th>Active</th>
                   
                </tr>
              </thead>
              <tbody>
                {this.props.series.map(listseries => (
                  <tr key={listseries.id} className={ this.props.valueProps.seriesid == listseries.id ? 'table-success' : '' } >
                    <td>{listseries.id}</td>
                    <td>{listseries.name}</td>
                    <td>{listseries.series_order}</td>
                    <td>{listseries.best_of}</td>
                    <td>{listseries.winner}</td>                    
                    <td>{String(listseries.ended)}</td>
                    <td>{String(listseries.active)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
              : <div>
              <h2>No Series Created for this Tournament</h2>
              </div>         
             }
             
 
 
               {this.props.valueProps.seriesid ?
                  <div class="empty">
          <h2>Current Scenes</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Scene Name</th>
                  <th>Desc 1</th>
                  <th>Desc 2</th>
                  <th>Live</th>
                  <th>Activate</th>  
                </tr>
              </thead>
              <tbody>
                {this.props.scenes.map(listscenes => (
                  <tr key={listscenes.id} className={ listscenes.active ? 'table-success' : '' } >
                    <td>{listscenes.id}</td>
                    <td>{listscenes.name}</td>
                    <td>{listscenes.desc1}</td>                    
                    <td>{listscenes.desc2}</td>
                    <td>{String(listscenes.active)}</td>
                    <td>
                      <button
                      onClick={(e) => {
                      console.log("Activate listscenes.id:" + listscenes.id);
                      this.props.updateSceneActivate( listscenes, this.props.scenes );
                      //Object.assign(document.createElement('a'), { target: '_scenetab', href: '/#/caster/' + listscenes.id }).click();
                      const socket = socketIOClient("http://192.241.146.171:4001");
                      socket.emit('change scene', listscenes.id) // change scene by passing id to socket
                      }}
                      className="btn btn-success btn-sm">{" "} Activate
                      </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
              : <div>
              <h2>No Scenes Created</h2>
              </div>         
             }
             
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.back}>
              Back
            </button>
          </div>
      
         </div>
        
          </div>
        </main>
         
        </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({
  series: state.series.series,
  seriesdetails: state.seriesdetails.seriesdetails,
  matches: state.matches.matches,
  matchesdetails: state.matchesdetails.matchesdetails,
  scenes: state.scenes.scenes,
  teams: state.teams.teams,
  gamemaps: state.gamemaps.gamemaps,
  gamemodes: state.gamemodes.gamemodes,
  gamefactions: state.gamefactions.gamefactions  
});

export default connect( mapStateToProps,{ getSeries, getSeriesDetails, updateSeriesEnd, getMatches, getMatchesDetails, getScenes, getTeams, getGameMaps, getGameModes, getGameFactions, updateSceneActivate, updateSceneDeActivate } )(CasterViewSeries);