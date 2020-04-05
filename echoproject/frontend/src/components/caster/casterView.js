import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class CasterView extends Component {

  static propTypes = {
 
  };
    
  componentDidMount() {
 
  }
    
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
 
  };

  render() {
    //const { tournament, name, series_order, team_one, team_two, best_of } = this.state;
    
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Caster Live</h2>
  
      </div>
    );
  }
}

const mapStateToProps = state => ({
//  tournaments: state.tournaments.tournaments,
//  teams: state.teams.teams
});

export default connect( mapStateToProps,{  } )(CasterView);