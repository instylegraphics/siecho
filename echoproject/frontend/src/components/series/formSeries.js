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
    //console.log(series);
    //console.log("best of:" + series.best_of);
    
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
    
    var jsonQuery = require('json-query');
        
    let isTournamentHasID = false;
    //console.log("reder props output:");
    //console.log(this.props);
    //console.log("reder this.props.series:");
    //console.log(this.props.series);    
 
     //check if tournament has avaialble series already created , also check if tournament id exist 
     //console.log("tournament:" + tournament)
    if (!Array.isArray(this.props.series) || !this.props.series.length || !tournament ) {
      // array does not exist, is not an array, or is empty
      // ? do not attempt to process array
      //console.log("array is null:");
      //console.log(this.props.series);
      isTournamentHasID = false; 
    }else{
      //console.log("array is NOT null:");
      //console.log(this.props.series);
      isTournamentHasID = true; 
    }
    //console.log("isTournamentHasID:" + isTournamentHasID);
    //console.log("view:" + view)
     switch (view) {
      case "caster":
        //console.log("switch caster view");
        return (
          <CasterViewSeries
            prevStep={this.prevStep}
            valueProps={valueProps}
          />
        );
      default:
        return (
     		<main class="page-content">
    			<div class="container">
    				<div class="col-md-8 m-auto card card-body mt-4 mb-4 ">
    					<h2>Create Series</h2>
              <form onSubmit={this.onSubmit}>
    						<div class="row">
    							<div class="col-md-12">
    								<div class="form-group">
    									<label class="col-form-label col-form-label-lg">Tournament</label>
                        <select name="tournament" className="form-control custom-select" 
                         onChange={(e) => {
                        //console.log("tournament:" + e.target.value);
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
    								<div class="form-group">
    									<label class="col-form-label col-form-label-lg">Name of Series</label>
      									<input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        value={name}
                        />
    								</div>
    								<div class="form-group">
    									<label class="col-form-label col-form-label-lg">Series Order</label>
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
    							</div>
    						</div>
    	
    						<div class="row d-flex justify-content-center text-center">
    							<div class="col-md-5 match-editor-border null">
    								<div class="form-group my-3">
    									<label class="col-form-label col-form-label-lg">Team One</label>
      									<select name="team_one" className="form-control custom-select" onChange={this.onChange}>
                          <option>Select Team One</option>
                         {this.props.teams.map(team => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                         ))}
                        </select>
    								</div>
    							</div>
    							<div class="col-md-2 vertical-align-ultimate text-center"><i class="fas fa-times fa-7x"></i>
    							</div>
    							<div class="col-md-5 match-editor-border null">
    								<div class="form-group my-3">
    									<label class="col-form-label col-form-label-lg">Team Two</label>
                         <select name="team_two" className="form-control custom-select" onChange={this.onChange}>
                          <option>Select Team Two</option>
                         {this.props.teams.map(team => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                         ))}
                        </select>
    								</div>
    							</div>
    						</div>
    
    						<div class="row">
    							<div class="col-md-12">
    								<div class="form-group">
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
    							</div>
    							<div class="col-md-12 my-2">
    								<button type="submit" class="btn btn-primary btn-lg btn btn-deep-purple waves-effect waves-light btn-block">Add Series</button>
    							</div>
    						</div>
    
    					</form>
    				</div>
    			</div>
          
          {isTournamentHasID ?
    			<div class="container-fluid">
    				<div class="col-md-12 m-auto card card-body mt-4 mb-4 ">
    					<h3>Created Series for This Tournament</h3>
    					<div class="table-responsive">
    						<table class="table table-striped">
    						<thead>
    							<tr>
    								<th class="text-center">ID</th>
    								<th>Name</th>
    								<th>Winner</th>
    								<th class="text-center">Best Of</th>
    								<th>Team One</th>
    								<th class="text-center">Team One Score</th>
    								<th>Team Two</th>
    								<th class="text-center">Team Two Score</th>
    								<th class="text-center">Ended</th>
    								<th class="text-center">Active</th>
    								<th class="text-center">Delete</th>
    								<th class="text-center">View</th>								
    							</tr>
    						</thead>
                 <tbody>
                  {this.props.series.map(listseries => (
                    <tr key={listseries.id}>
                      <td className="text-center">{listseries.id}</td>
                      <td>{listseries.name}</td>
                      <td>{ jsonQuery('[id=' + listseries.winner + '].short_name', { data: this.props.teams }).value }</td>
                      <td className="text-center">{listseries.best_of}</td>
                      <td>{ jsonQuery('[id=' + listseries.team_one + '].short_name', { data: this.props.teams }).value }</td>
                      <td className="text-center">{listseries.team_one_score}</td>
                      <td>{ jsonQuery('[id=' + listseries.team_two + '].short_name', { data: this.props.teams }).value }</td>
                      <td className="text-center">{listseries.team_two_score}</td>
                      <td className="text-center">{ String(listseries.ended) == 'true' ? <i className="fas fa-check fa-lg green-text"></i> : <i className="fas fa-times fa-lg red-text"></i> }</td>
                      <td className="text-center">{ String(listseries.active) == 'true' ? <i className="fa fa-circle fa-lg green-text"></i> : <i className="fa fa-circle fa-lg red-text"></i> }
      
                        </td>
                      <td className="text-center">
                        <button
                        onClick={(e) => {
                        //console.log("listseries.id:" + listseries.id);
                        this.props.deleteSeries(listseries.id);
                        }}
                        className="btn btn-danger btn-sm btn-danger waves-effect waves-light">{" "} Delete
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                        onClick={(e) => {
                        //console.log("listseries.id:" + listseries.id);
                        let { view, seriesid } = this.state;
                        view = "caster";
                        seriesid = listseries.id;
                        this.setState({ view, seriesid });
                        }} 
                        className="btn btn-primary btn-sm btn-dark-green waves-effect waves-light">View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
    						</table>
    					</div>
    				</div>
    			</div>
          :
    			<div class="container-fluid">
    				<div class="col-md-12 m-auto card card-body mt-4 mb-4 ">
    					<h3>No Series Created for this Tournament</h3>
    				</div>
    			</div>             
          }
    		</main>
       
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