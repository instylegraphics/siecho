import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches, getMatchesDetails } from "../../actions/matches";
import { getScenes } from "../../actions/scenes";
import { getSeries, getSeriesDetails, updateSeriesEnd } from "../../actions/series";

 export class CasterViewSeries extends Component {

  componentDidMount() {
    console.log("componentDidMount - casterViewSeries");
    console.log('valueProps.seriesid');
    console.log(this.props.valueProps.seriesid);
    console.log('valueProps.tournament');
    console.log(this.props.valueProps.tournament);
    this.props.getMatches(this.props.valueProps.seriesid);
    this.props.getMatchesDetails(this.props.valueProps.seriesid);
    this.props.getSeries(this.props.valueProps.tournament);
    this.props.getSeriesDetails(this.props.valueProps.tournament);
    this.props.getScenes();
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
//    var f_match_team_one_name = f_jsonQuery('[id=' + f_seriesid + '].team_one.id', { data: this.props.series }).value;
//    var f_match_team_two_name = f_jsonQuery('[id=' + f_seriesid + '].team_two.id', { data: this.props.series }).value;
    var f_match_team_one_name = f_jsonQuery('[id=' + f_seriesid + '].team_one', { data: this.props.series }).value;
    var f_match_team_two_name = f_jsonQuery('[id=' + f_seriesid + '].team_two', { data: this.props.series }).value;

    var f_tournamentid = this.props.valueProps.tournament;
    
     const postObj = {
      id: f_seriesid,
      tournament: f_tournamentid,
      name: f_series_name,
      team_one: f_match_team_one_name,
      team_two: f_match_team_two_name,
      active: 'false',
      ended: 'true'
    } 

    console.log('POST');       
    console.log('seriesid:' + f_seriesid);  
    console.log('tournament:' + f_tournamentid); 
    console.log('name:' + f_series_name); 
    console.log('team_one:' + f_match_team_one_name);  
    console.log('team_two:' + f_match_team_two_name);
    console.log('series update: postObj:');
    console.log(postObj);
    
    //post and update series
    this.props.updateSeriesEnd( postObj );
 
    // Force a render without state change...
    
    //setTimeout( this.props.getSeriesDetails( f_tournamentid ), 3000);
    //setTimeout( this.forceUpdate(), 4000);

    // Force a render with a simulated state change
//    this.setState({ state: this.state });
    
  };
  
  
  static propTypes = {
    getSeries: PropTypes.func.isRequired,
    getSeriesDetails: PropTypes.func.isRequired,
    updateSeriesEnd: PropTypes.func.isRequired,
    getMatches: PropTypes.func.isRequired,
    getMatchesDetails: PropTypes.func.isRequired,
    getScenes: PropTypes.func.isRequired
  };


  render() {
 
    const { valueProps } = this.props;
    console.log("render casterViewSeries caster view");
    console.log('props');
    console.log(this.props);
    console.log('valueProps');
    console.log(this.props.valueProps);
    //console.log("view:" + view);
    
    
    function getTeamName( id, propsM ) {
      //console.log('inside: getTeamName');
      //console.log('matchesdetails:' + propsM );
      var r_jsonQuery = require('json-query');
      var txt_winner = r_jsonQuery('[id=' + id + '].winner.name', { data: propsM }).value;
      return txt_winner;
    }
    
    return (
       
        <React.Fragment>
         <div className="card card-body mt-4 mb-4">
            <h1>Caster View</h1>
 
            <div className="form-group">  
              <button
              onClick={this.endSeriesForm}
              className="btn btn-danger btn-sm">End Series
              </button>
           </div>   
           
                       
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
                  <tr key={listmatch.id}>
                    <td>{listmatch.id}</td>
                    <td>{listmatch.match_order}</td>
                    <td>{listmatch.roomcode}</td>
                    <td>{listmatch.team_one_score}</td>
                    <td>{listmatch.team_two_score}</td>
                    <td>{String(listmatch.winner)}:{ getTeamName(listmatch.id, this.props.matchesdetails) } </td>
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
                  <th>Title</th>
                  <th>Desc 1</th>
                  <th>Enabled</th>
                   
                </tr>
              </thead>
              <tbody>
                {this.props.scenes.map(listscenes => (
                  <tr key={listscenes.id}>
                    <td>{listscenes.id}</td>
                    <td>{listscenes.name}</td>
                    <td>{listscenes.title}</td>                    
                    <td>{listscenes.desc1}</td>
                    <td>{String(listscenes.enabled)}</td>
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
        </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({
  series: state.series.series,
  seriesdetails: state.seriesdetails.seriesdetails,
  matches: state.matches.matches,
  matchesdetails: state.matchesdetails.matchesdetails,
  scenes: state.scenes.scenes
});

export default connect( mapStateToProps,{ getSeries, getSeriesDetails, updateSeriesEnd, getMatches, getMatchesDetails, getScenes } )(CasterViewSeries);