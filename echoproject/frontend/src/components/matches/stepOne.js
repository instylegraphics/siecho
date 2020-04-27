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
    getTournaments: PropTypes.array.isRequired   
  };
    
  componentDidMount() {
    this.props.getTournaments();
  
  }
  render() {
    const { valueProps, handleChange } = this.props;
    console.log(this.props);
 
    return (
      <React.Fragment>
      <main className="page-content">
        <form>
        <div className="container-fluid">
        <div className="card card-body mt-4 mb-4">
                     
        <div className="md-stepper-horizontal">
            <div className="md-step active editable">
              <div className="md-step-circle"><span>1</span></div>
              <div className="md-step-title">Tournament</div>
              <div className="md-step-bar-left"></div>
              <div className="md-step-bar-right"></div>
            </div>
            <div className="md-step">
              <div className="md-step-circle done"><span>2</span></div>
              <div className="md-step-title">Series</div>
              <div className="md-step-bar-left"></div>
              <div className="md-step-bar-right"></div>
            </div>
            <div className="md-step">
              <div className="md-step-circle"><span>3</span></div>
              <div className="md-step-title">Match</div>
              <div className="md-step-bar-left"></div>
              <div className="md-step-bar-right"></div>
            </div>
            <div className="md-step">
              <div className="md-step-circle"><span>4</span></div>
              <div className="md-step-title">Review</div>
              <div className="md-step-bar-left"></div>
              <div className="md-step-bar-right"></div>
            </div>
        </div>


        <div className="form-group mt-4">
              <label for="validationDefault01">Select Tournament</label>       
                 <select required value={valueProps.tournament} name="tournament" className="form-control custom-select-lg card--body__formSelect" onChange={handleChange('tournament')}>
                 <option>List of Tournaments</option>
                 {this.props.tournaments.map(tournament => (
                  <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
                 ))}
                </select>
        </div>
   
        <div className="form-group mt-2">
            <button type="button" className="btn btn-primary btn-lg btn btn-deep-purple waves-effect waves-light float-right" onClick={this.continue}>
              Continue
            </button>
        </div>    

           
        </div>
        </div>
      </form>  
      </main>
                 
      </React.Fragment>
       
    );
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments.tournaments,
});

export default connect( mapStateToProps,{ getTournaments } )(StepOneTournamentForm);
