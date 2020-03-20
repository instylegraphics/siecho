import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addSeries } from "../../actions/series";
import { getTournaments } from "../../actions/tournaments";
import { getTeams} from "../../actions/teams";

export class FormSeries extends Component {

  state = {
    tournament: "",
    name: "",
    series_order: "",
    team_one: "",
    team_two: "",
    best_of: ""
  };

  static propTypes = {
    teams: PropTypes.array.isRequired,  
    tournaments: PropTypes.array.isRequired,
    addSeries: PropTypes.func.isRequired,
    getTournaments: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired   
  };
    
 
  componentDidMount() {
    this.props.getTournaments();
    this.props.getTeams();
    
    //activate bs spinner
    //$("input[type='number']").inputSpinner();

  }
    
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { tournament, name, series_order, team_one, team_two, best_of } = this.state;
    const series = { tournament, name, series_order, team_one, team_two, best_of };
    this.props.addSeries(series);
    console.log(series);
    console.log("best of:" + series.best_of);
    
    this.setState({
      tournament: "",
      name: "",
      series_order: "",
      team_one: "",
      team_two: "",
      best_of: ""
    });
  };

  render() {
    const { tournament, name, series_order, team_one, team_two, best_of } = this.state;
    
    return (
      <div className="card card-body mt-4 mb-4">
        { console.log(this.props) }
        <h2>Create a Series</h2>
        <form onSubmit={this.onSubmit}>
          
          <div className="form-group">
            <label>Tournament</label>          
               <select name="tournament" className="form-control custom-select" onChange={this.onChange}>
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
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments.tournaments,
  teams: state.teams.teams
});

export default connect( 
  mapStateToProps,
    { addSeries, getTournaments, getTeams } 
)(FormSeries);