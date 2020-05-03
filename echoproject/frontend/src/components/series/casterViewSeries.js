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
        //console.log('fetch start');
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
    //console.log('fetch end');
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
      //console.log(key + ' = ' + JSON.stringify(value) );
      //console.log('id = ' + value.id );
      //console.log('winner = ' + value.winner );
      if ( f_match_team_one_id == value.winner ) {
        f_team_one_score = f_team_one_score + 1;  
      };
      if ( f_match_team_two_id == value.winner ) {
        f_team_two_score = f_team_two_score + 1;  
      };
    }// for loop
    //console.log('f_team_one_score:' + f_team_one_score);  
    //console.log('f_team_two_score:' + f_team_two_score);   
    if ( f_team_one_score > f_team_two_score ) {
      f_winner = f_match_team_one_id;
    } else {
      f_winner = f_team_two_score;
    }
    //console.log('f_winner:' + f_winner); 
        
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

    //console.log('POST');       
/*    console.log('seriesid:' + f_seriesid);  
    console.log('tournament:' + f_tournamentid); 
    console.log('name:' + f_series_name); 
    console.log('team_one:' + f_match_team_one_id);  
    console.log('team_two:' + f_match_team_two_id);
*/
    //console.log('series update: postObj:');
    //console.log(postObj);
    
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
    var match_id = jsonQuery('[*series=' + this.props.valueProps.seriesid + '][active=true].id', { data: this.props.matches }).value;
    var match_roomcode = jsonQuery('[*series=' + this.props.valueProps.seriesid + '][active=true].roomcode', { data: this.props.matches }).value;   
    var match_team_one_score = jsonQuery('[*series=' + this.props.valueProps.seriesid + '][active=true].team_one_score', { data: this.props.matches }).value;
    var match_team_two_score = jsonQuery('[*series=' + this.props.valueProps.seriesid + '][active=true].team_two_score', { data: this.props.matches }).value;
    var match_match_order = jsonQuery('[*series=' + this.props.valueProps.seriesid + '][active=true].match_order', { data: this.props.matches }).value; 
    var match_active = jsonQuery('[*series=' + this.props.valueProps.seriesid + '][active=true].active', { data: this.props.matches }).value;   
    var match_ended = jsonQuery('[*series=' + this.props.valueProps.seriesid + '][active=true].ended', { data: this.props.matches }).value;     
    var match_team_one_faction_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].team_one_faction', { data: this.props.matches }).value; 
    var match_team_two_faction_id = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][active=true].team_two_faction', { data: this.props.matches }).value; 
    var match_team_one_faction_name = jsonQuery('[id=' + match_team_one_faction_id + '].name', { data: this.props.gamefactions }).value;
    var match_team_two_faction_name = jsonQuery('[id=' + match_team_two_faction_id + '].name', { data: this.props.gamefactions }).value;
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
    var match_still_not_ended = jsonQuery('[*series=' + this.props.valueProps.seriesid+ '][*ended=false].id', { data: this.props.matches }).value;
    
    //tournament info
    var tournament_name = jsonQuery('[id=' + this.props.valueProps.seriesid + '].tournament.name', { data: this.props.seriesdetails }).value;
    var series_name = jsonQuery('[id=' + this.props.valueProps.seriesid + '].name', { data: this.props.seriesdetails }).value;
    var series_bestof = jsonQuery('[id=' + this.props.valueProps.seriesid + '].best_of', { data: this.props.seriesdetails }).value;
    
    return (
       
    <React.Fragment>
      <main className="page-content">
          <div className="container-fluid">
              <div className="col-12 m-auto card card-body mt-4 mb-4 ">
                  <div className="row no-gutters">
                      <div className="col-9 scene_left_container">
                          <div className="container">
                              <div className="row">
                                  <div className="col-md-6">
                                      <h1>Game Statistics</h1>
                                      <p className="h5">Tournament: <span className="text-warning">{ tournament_name }</span></p>
                                      <p className="h4">Series: <span className="text-warning">{ series_name }</span></p>
                                  </div>
                                  
                                  <div className="col-md-6 text-right">
                                      { String(match_still_not_ended) == '' ? 
                                      <button type="button" onClick={ this.endSeriesForm } className="btn btn-danger btn-lg waves-effect waves-light">End Series</button>
                                      : 
                                      <button className="btn btn-danger btn-lg waves-effect waves-light disabled">End Series</button>
                                      }
                                      <button type="button" className="btn btn-primary btn-lg btn-deep-purple waves-effect waves-light" onClick={this.back}>Back</button>
                                  </div>
                              </div>
                              
                              { match_id ?
                              <div className="empty">
                              <div className="row  mt-3">
                                  <div className="col-md-12 col-sm-12">
                                      <h3 className="h3-responsive font-weight-bold"><i className="fa fa-circle fa-sm green-text fa-blink"></i> Current Match</h3>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col-md-3 col-sm-6">
                                      <h5>Match Number</h5>
                                  </div>
                                  <div className="col-md-3 col-sm-6">
                                      <p className="h4"><span className="text-warning font-weight-bold">{ match_match_order }</span> of { series_bestof }</p>
                                  </div>
                                      <div className="col-md-3 col-sm-6">
                                      <h5>Room Code</h5>
                                  </div>
                                  <div className="col-md-3 col-sm-6">
                                      <p className="h4 text-warning">{ match_roomcode }</p>
                                  </div>
                                  <div className="col-md-3 col-sm-6">
                                      <h5>Game Mode</h5>
                                  </div>
                                  <div className="col-md-3 col-sm-6">
                                      <p className="h4 text-warning">{ match_gamemode_name }</p>
                                  </div>
                                      <div className="col-md-3 col-sm-6">
                                      <h5>Game Map</h5>
                                  </div>
                                  <div className="col-md-3 col-sm-6">
                                      <p className="h4 text-warning">{ match_gamemap_name }</p>
                                  </div>
                              </div>
      
                              <div className="row mt-2 mb-2">
                                  <div className="col-md-10 offset-md-1">
                                      <div className="row d-flex justify-content-center"> 
                                          <div className="col-md-4 match-editor-border mb-2 text-center">
                                              <div className={`${'text-center mt-3 pt-2'} ${ match_team_one_faction_htmlcolor }`}>
                                                  { match_team_one_id == match_winner_id ?
                                                  <div>
                                                  <h2 class="text-warning font-weight-bold fa-blink">WINNER!</h2>
                                                  <p className="h4 fa-blink">{ match_team_one_name }</p>
                                                  <img className="card--body__img card-img-top pb-2 fa-blink" src={ match_team_one_image } alt={ match_team_one_name } aria-label={ match_team_one_name } />
                                                  </div>
                                                  :
                                                  <div>
                                                  <h6 className="text-warning">Team One</h6>
                                                  <p className="h4">{ match_team_one_name }</p>
                                                  <img className="card--body__img card-img-top pb-2" src={ match_team_one_image } alt={ match_team_one_name } aria-label={ match_team_one_name } />
                                                  </div>
                                                  } 
                                                  
                                              </div>
                                              <div className={`${'mb-2 pb-1'} ${ match_team_one_faction_htmlcolor }`}>
                                                  <h6 className="text-warning">Team Faction</h6> 
                                                  <p className="h4">{ match_team_one_faction_name }</p>
                                              </div>
                                              <div>
                                                  <h6 className="text-warning">Score</h6> 
                                                  <p className="score">{ match_team_one_score }</p>
                                              </div>
      
                                          </div>
                                          <div className="col-md-2 vertical-align-ultimate text-center"><i className="fas fa-times fa-7x"></i>
                                          </div>
      
                                          <div className="col-md-4 match-editor-border mb-2 text-center">
                                              <div className={`${'text-center mt-3 pt-2'} ${ match_team_two_faction_htmlcolor }`}>
                                                  { match_team_two_id == match_winner_id ?
                                                  <div>
                                                  <h2 class="text-warning font-weight-bold fa-blink">WINNER!</h2>
                                                  <p className="h4 fa-blink">{ match_team_two_name }</p>
                                                  <img className="card--body__img card-img-top pb-2 fa-blink" src={ match_team_two_image } alt={ match_team_two_name } aria-label={ match_team_two_name } />
                                                  </div>
                                                  :
                                                  <div>
                                                  <h6 className="text-warning">Team Two</h6>
                                                  <p className="h4">{ match_team_two_name }</p>
                                                  <img className="card--body__img card-img-top pb-2" src={ match_team_two_image } alt={ match_team_two_name } aria-label={ match_team_two_name } />
                                                  </div>
                                                  }
                                              </div>
                                              <div className={`${'mb-2 pb-1'} ${ match_team_two_faction_htmlcolor }`}>
                                                  <h6 className="text-warning">Team Faction</h6> 
                                                  <p className="h4">{ match_team_two_faction_name }</p>
                                              </div>
                                              <div>
                                                  <h6 className="text-warning">Score</h6> 
                                                  <p className="score">{ match_team_two_score }</p>
                                              </div>
                                          </div>
      
                                      </div>
                                  </div>
                              </div>
                              </div>
                              :
                              <div className="row  mt-3">
                                  <div className="col-md-12 col-sm-12">
                                      <h3 className="h3-responsive font-weight-bold"><i className="fa fa-circle fa-sm red-text"></i> No Live Match</h3>
                                  </div>
                              </div>
                              }
      
                              {this.props.valueProps.seriesid ?
                              <div className="row no-gutters">
                                  <div className="col-md-12 m-auto card card-body">
                                      <h3>Matches for <span className="text-warning font-weight-bold">{ series_name }</span> Series</h3>
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
                                                <tr key={listmatch.id} className={ match_id == listmatch.id ? 'table-dark' : '' } >
                                                  <td className="text-center">{listmatch.id}</td>
                                                  <td className="text-center">{listmatch.match_order}</td>
                                                  <td>{ jsonQuery('[id=' + listmatch.winner + '].short_name', { data: this.props.teams }).value }</td>
                                                  <td className="text-center">{listmatch.team_one_score}</td>
                                                  <td className="text-center">{listmatch.team_two_score}</td>
                                                  <td>{ jsonQuery('[id=' + listmatch.gamemode + '].name', { data: this.props.gamemodes }).value }</td>
                                                  <td>{ jsonQuery('[id=' + listmatch.gamemap + '].name', { data: this.props.gamemaps }).value }</td>
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
                              <div className="row no-gutters">
                                  <div className="col-md-12 m-auto card card-body">
                                      <h3>No Matches found for this Series</h3>
                                  </div>
                              </div>         
                              }
                              
                              {this.props.valueProps.tournament ?
                              <div className="row no-gutters">
                                  <div className="col-md-12 m-auto card card-body">
                                      <h3>Series for <span className="text-warning font-weight-bold">{ tournament_name }</span> Tournament</h3>
                                      <div className="table-responsive">
                                          <table className="table table-striped">
                                              <thead>
                                              <tr>
                                                  <th className="text-center">Order</th>
                                                  <th>Name</th>
                                                  <th>Winner</th>
                                                  <th className="text-center">Best Of</th>
                                                  <th>Team One</th>
                                                  <th className="text-center">Team One Score</th>
                                                  <th>Team Two</th>
                                                  <th className="text-center">Team Two Score</th>
                                                  <th className="text-center">Ended</th>
                                                  <th className="text-center">Active</th>
                                              </tr>
                                              </thead>
                                              <tbody>
                                              {this.props.series.map(listseries => (
                                                <tr key={listseries.id} className={ this.props.valueProps.seriesid == listseries.id ? 'table-dark' : '' } >
                                                  <td className="text-center">{listseries.series_order}</td>
                                                  <td>{listseries.name}</td>
                                                  <td>{ jsonQuery('[id=' + listseries.winner + '].short_name', { data: this.props.teams }).value }</td>                                            
                                                  <td className="text-center">{listseries.best_of}</td>
                                                  <td>{ jsonQuery('[id=' + listseries.team_one + '].short_name', { data: this.props.teams }).value }</td> 
                                                  <td className="text-center">{listseries.team_one_score}</td>      
                                                  <td>{ jsonQuery('[id=' + listseries.team_two + '].short_name', { data: this.props.teams }).value }</td> 
                                                  <td className="text-center">{listseries.team_two_score}</td>                                                         
                                                  <td className="text-center">{ String(listseries.ended) == 'true' ? <i className="fas fa-check fa-lg green-text"></i> : <i className="fas fa-times fa-lg red-text"></i> }</td>
                                                  <td className="text-center">{ String(listseries.active) == 'true' ? <i className="fa fa-circle fa-lg fa-blink green-text"></i> : <i className="fa fa-circle fa-lg red-text"></i> }</td>                                             
                                                </tr>
                                              ))}
                                              </tbody>  
                                          </table>
                                      </div>
                                  </div>
                              </div>
                              : 
                              <div className="row no-gutters">
                                  <div className="col-md-12 m-auto card card-body">
                                      <h3>No Series Created for this Tournament</h3>
                                  </div>
                              </div>         
                              }
                              
                          </div>	
                      </div>
                      
                      {this.props.valueProps.seriesid ?
                      <div className="col-3 scene_right_container">
                          <div className="match-scenes-scroll">
                              <div className="row no-gutters">
                                  <div className="col-md-12 col-sm-12">
                                      <h3>Desk Scenes</h3>
                                  </div>
                              </div>
                              
            
                              {this.props.scenes.map(listscenes => (
                                <div key={listscenes.id} className={ listscenes.active ? 'row no-gutters match-editor-border-noradius-green white-text fa-blink' : 'row no-gutters match-editor-border-noradius grey-text' } >
                                
                                    <div className="col-md-12 col-sm-12 ">
                                        { listscenes.active ?
                                        <h5 className="font-weight-bold ml-3 mt-2"><i className="fas fa-video red-text fa-blink"></i> LIVE</h5>
                                        :
                                        <h5 className="font-weight-bold ml-3 mt-2"><i className="fas fa-video green-text"></i> READY</h5>
                                        }
                                    </div>
                                    <div className="col-md-5 col-sm-12">
                                        <h5 className="font-weight-bold text-warning ml-3 mt-2">{ listscenes.name }</h5>							
                                        <div className="article__content ml-3 mb-1">{ listscenes.desc1 }</div>
                                        { listscenes.desc2 ?
                                        <div className="article__content ml-3">
                                          <i className="fas fa-comment-alt gray-text"></i> { listscenes.desc2 }
                                        </div>
                                        :
                                        <div></div>
                                        }
                                        <button
                                        onClick={(e) => {
                                        //console.log("Activate listscenes.id:" + listscenes.id);
                                        this.props.updateSceneActivate( listscenes, this.props.scenes );
                                        //Object.assign(document.createElement('a'), { target: '_scenetab', href: '/#/caster/' + listscenes.id }).click();
                                        const socket = socketIOClient("http://192.241.146.171:4001");
                                        socket.emit('change scene', listscenes.id) // change scene by passing id to socket
                                        }}
                                        className={ listscenes.active ? 'btn btn-sm btn-primary btn-success waves-effect waves-light ml-3 mb-3' : 'btn btn-sm btn-primary btn-indigo waves-effect waves-light ml-3 mb-3' } >
                                        Activate
                                        </button>                                
                                    </div>
                                    <div className="col-md-7 col-sm-12">
                                        <img id="imgview" className="scene--image d-block img-fluid" src={ listscenes.img_default_url } alt={ listscenes.name } />
                                    </div>	
                                </div>
                              ))}
                              
                          </div>
                      </div>
                      :
                      <div className="col-3 scene_right_container">
                          <div className="match-scenes-scroll">
                              <div className="row no-gutters">
                                  <div className="col-md-12 col-sm-12">
                                      <h3>No Scenes Created</h3>
                                  </div>
                              </div>
                          </div>
                      </div>        
                      }
                      
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