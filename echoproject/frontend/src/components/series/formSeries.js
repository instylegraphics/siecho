import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addSeries, getSeries, getSeriesDetails, deleteSeries } from "../../actions/series";
import { getTournaments } from "../../actions/tournaments";
import { getTeams} from "../../actions/teams";

import CasterViewSeries from './casterViewSeries';

export class FormSeries extends Component {

    constructor(props){
        super(props);
        this.state = {
          tournament: "",
          name: "",
          series_order: "",
          team_one: "",
          team_two: "",
          best_of: "",
          view: "",
          seriesid: ""
        };
      //this.getSeriesLists = this.getSeriesLists.bind(this);
    }
 
  static propTypes = {
    teams: PropTypes.array.isRequired,  
    tournaments: PropTypes.array.isRequired,
    addSeries: PropTypes.func.isRequired,
    getTournaments: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired,
    getSeries: PropTypes.func.isRequired,
    getSeriesDetails: PropTypes.func.isRequired,
    deleteSeries: PropTypes.func.isRequired
  };
    
 
  componentDidMount() {
    this.props.getTournaments();
    this.props.getTeams();
    
    //activate bs spinner
    //$("input[type='number']").inputSpinner();

  }

/*
  shouldComponentUpdate() {
  console.log("this.state.tournament:" + this.state.tournament );
    if this.state.tournament != null {
      console.log("shouldComponentUpdate");
    }
  }
*/  
  
/*  static getDerivedStateFromProps(props, state) {
    if (props.selected !== state.selected) {
      return {
        selected: props.selected,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }
*/ 
  // Go back to prev step
  prevStep = () => {
    const { view } = this.state;
    this.setState({
      view: "empty"
    });
  };
   
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { tournament, name, series_order, team_one, team_two, best_of } = this.state;
    const series = { tournament, name, series_order, team_one, team_two, best_of };
    this.props.addSeries(series);
    console.log(series);
    console.log("best of:" + series.best_of);
    
/*   reset state value after submit
    this.setState({
      tournament: "",
      name: "",
      series_order: "",
      team_one: "",
      team_two: "",
      best_of: ""
    });
 */
  };

  render() {
    const { tournament, name, series_order, team_one, team_two, best_of, view, seriesid } = this.state;
    const valueProps = { tournament, name, series_order, team_one, team_two, best_of, view, seriesid };
        
    let isTournamentHasID = false;
    console.log("reder props output:");
    console.log(this.props);
    console.log("reder this.props.series:");
    console.log(this.props.series);    
 
   //check if tournament has avaialble series already created , also check if tournament id exist 
   console.log("tournament:" + tournament)
    if (!Array.isArray(this.props.series) || !this.props.series.length || !tournament ) {
      // array does not exist, is not an array, or is empty
      // ? do not attempt to process array
      console.log("array is null:");
      console.log(this.props.series);
      isTournamentHasID = false; 
    }else{
      console.log("array is NOT null:");
      console.log(this.props.series);
      isTournamentHasID = true; 
    }
    console.log("isTournamentHasID:" + isTournamentHasID);
    console.log("view:" + view)
     switch (view) {
      case "caster":
        console.log("switch caster view");
        return (
          <CasterViewSeries
            prevStep={this.prevStep}
            valueProps={valueProps}
          />
        );
      default:
        return (
          <div className="card card-body mt-4 mb-4">
            { console.log(this.props) }
            <h2>Create a Series</h2>
            <form onSubmit={this.onSubmit}>
              
              <div className="form-group">
                <label>Tournament</label>          
                   <select name="tournament" className="form-control custom-select" 
                   onChange={(e) => {
                  console.log("tournament:" + e.target.value);
                  this.setState({ tournament: e.target.value });
                  this.props.getSeries(e.target.value);
                  this.props.getSeriesDetails(e.target.value);
                  }}
                   >
                    <option>Select Tournament</option>
                   {this.props.tournaments.map(tournament => (
                    <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
                   ))}
                  </select>
              </div>
              
              <div className="form-group">
                <label>Name of Series</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={name}
                />
              </div>
    
              <div className="form-group">
                <label>Series Order</label>
                <input
                  className="form-control"
                  type="number"
                  min="0" 
                  max="100" 
                  step="1"
                  name="series_order"
                  onChange={this.onChange}
                  value={series_order}
                />
              </div>
     
     
              <div className="form-group">
                <label>Team One</label>          
                   <select name="team_one" className="form-control custom-select" onChange={this.onChange}>
                    <option>Select Team One</option>
                   {this.props.teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                   ))}
                  </select>
              </div>
     
              
              <div className="form-group">
                <label>Team Two</label>          
                   <select name="team_two" className="form-control custom-select" onChange={this.onChange}>
                    <option>Select Team Two</option>
                   {this.props.teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                   ))}
                  </select>
              </div>
                    
                       
               <div className="form-group">
                <label>Total Matches (Best of)</label>
                <input
                  className="form-control"
                  type="number"
                  min="0" 
                  max="100" 
                  step="1"
                  name="best_of"
                  onChange={this.onChange}
                  value={best_of}
                />
              </div>                               
      
                                 
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Add Series
                </button>
              </div>
            </form>
       
             {isTournamentHasID ?
                  <div class="empty">
          <h2>Current Series for This Tournament</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th># of Matches(Best Of)</th>
                  <th>Ended</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.series.map(listseries => (
                  <tr key={listseries.id}>
                    <td>{listseries.id}</td>
                    <td>{listseries.name}</td>
                    <td>{listseries.best_of}</td>
                    <td>{String(listseries.ended)}</td>
                    <td>
                      <button
                      onClick={(e) => {
                  console.log("listseries.id:" + listseries.id);
                  this.props.deleteSeries(listseries.id);
                  }}
                      className="btn btn-danger btn-sm">{" "} Delete
                      </button>
                      <button
                      onClick={(e) => {
                  console.log("listseries.id:" + listseries.id);
                  //alert("listseries.id:" + listseries.id);
                  let { view, seriesid } = this.state;
                  view = "caster";
                  seriesid = listseries.id;
                  this.setState({ view, seriesid });
                  }} 
                      className="btn btn-success btn-sm">{" "} View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
              : <div>
              <h2>No Series Created for this Tournament</h2>
              </div>         
             }
             
     
          </div>
        );
    
    
    }
    //end switch 

  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments.tournaments,
  teams: state.teams.teams,
  series: state.series.series,
  seriesdetails: state.seriesdetails.seriesdetails
});

export default connect( 
  mapStateToProps,
    { addSeries, getTournaments, getTeams, getSeries, getSeriesDetails, deleteSeries } 
)(FormSeries);