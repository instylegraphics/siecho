import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSeries } from "../../actions/series";
import { getTournaments } from "../../actions/tournaments";
import axios from "axios";

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
    addSeries: PropTypes.func.isRequired,
    tournaments: PropTypes.array.isRequired,
    getTournaments: PropTypes.func.isRequired      
  };
    
  componentDidMount() {
    this.props.getTournaments();
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
        <h2>Add Series</h2>
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
            <label>name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>

          <div className="form-group">
            <label>series_order</label>
            <input
              className="form-control"
              type="text"
              name="series_order"
              onChange={this.onChange}
              value={series_order}
            />
          </div>
          
          <div className="form-group">
            <label>team_one</label>
            <input
              className="form-control"
              type="text"
              name="team_one"
              onChange={this.onChange}
              value={team_one}
            />
          </div>
          
          <div className="form-group">
            <label>team_two</label>
            <input
              className="form-control"
              type="text"
              name="team_two"
              onChange={this.onChange}
              value={team_two}
            />
          </div>         
                   
           <div className="form-group">
            <label>best_of</label>
            <input
              className="form-control"
              type="text"
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
  tournaments: state.tournaments.tournaments
});

export default connect( 
  mapStateToProps,
    { addSeries, getTournaments } 
)(FormSeries);