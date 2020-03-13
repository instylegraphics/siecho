import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTournaments } from "../../actions/tournaments";

export class Tournaments extends Component {
  static propTypes = {
    tournaments: PropTypes.array.isRequired,
    getTournaments: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getTournaments();
  }

  render() {
    return (
      <Fragment>
        <h2>Tournaments</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tournaments.map(tournament => (
              <tr key={tournament.id}>
                <td>{tournament.id}</td>
                <td>{tournament.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments.tournaments
});

export default connect( 
  mapStateToProps,
    { getTournaments } 
)(Tournaments);
