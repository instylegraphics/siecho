import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTournaments } from "../../actions/tournaments";

export class StepOneTournamentForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();

  };
  static propTypes = {
    getTournaments: PropTypes.func.isRequired   
  };
    
  componentDidMount() {
    this.props.getTournaments();
  
  }
  render() {
    const { valueProps, handleChange } = this.props;
    console.log(this.props);
    return (
       
        <React.Fragment>
        <div className="card card-body mt-4 mb-4">
                    <h1>Step 1: Pick Tournament</h1>
                              
          <div className="form-group">
            <label>Tournament</label>          
               <select required value={valueProps.tournament} name="tournament" className="form-control custom-select" onChange={handleChange('tournament')}>
                <option>Select Tournament</option>
               {this.props.tournaments.map(tournament => (
                <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
               ))}
              </select>
          </div>

            <br />
   
            
             <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.continue}>
              Continue
            </button>
          </div>
            
         </div>
        </React.Fragment>
       
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments.tournaments,
});

export default connect( mapStateToProps,{ getTournaments } )(StepOneTournamentForm);
