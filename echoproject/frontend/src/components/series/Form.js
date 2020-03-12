import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSeries } from "../../actions/series";

export class Form extends Component {
  state = {
    tournament: "",
    name: "",
    series_order: "",
    team_one: "",
    team_one_score: "",
    team_two: "",
    team_two_score: "",
    best_of: "",
    active: ""
  };

  static propTypes = {
    addSeries: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { tournament, name, series_order, team_one, team_one_score, team_two, team_two_score, best_of, active } = this.state;
    const series = { tournament, name, series_order, team_one, team_one_score, team_two, team_two_score, best_of, active };
    this.props.addSeries(series);
    this.setState({
      tournament: "",
      name: "",
      series_order: "",
      team_one: "",
      team_one_score: "",
      team_two: "",
      team_two_score: "",
      best_of: "",
      active: ""
    });
  };

  render() {
    const { tournament, name, series_order, team_one, team_one_score, team_two, team_two_score, best_of, active } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Series</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>tournament</label>
            <input
              className="form-control"
              type="text"
              name="tournament"
              onChange={this.onChange}
              value={tournament}
            />
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
            <label>team_one_score</label>
            <input
              className="form-control"
              type="text"
              name="team_one_score"
              onChange={this.onChange}
              value={team_one_score}
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
            <label>team_two_score</label>
            <input
              className="form-control"
              type="text"
              name="team_two_score"
              onChange={this.onChange}
              value={team_two_score}
            />
          </div>
 
            <div className="form-group">
            <label>active</label>
            <input
              className="form-control"
              type="text"
              name="active"
              onChange={this.onChange}
              value={active}
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

export default connect(
  null,
  { addSeries }
)(Form);
