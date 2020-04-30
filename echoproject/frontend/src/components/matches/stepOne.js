import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTournaments } from "../../actions/tournaments";
import { createMessage } from "../../actions/messages";
 
export class StepOneTournamentForm extends Component {

/* old method
  continue = e => {
    e.preventDefault();
    this.props.nextStep(); 
  };
*/  
  static propTypes = {
    getTournaments: PropTypes.array.isRequired   
  };

  onSubmit = e => {
    console.log("step1 form submit");
    console.log("this.props.valueProps.tournament:" + this.props.valueProps.tournament);
    e.preventDefault();
    if ( this.props.valueProps.tournament == "" || typeof this.props.valueProps.tournament == "undefined" ) {
      this.props.createMessage({ tournamentNull: "Select a Tournament" });
    } else {
      console.log("success step1 -> next step");
      console.log("this.props.valueProps.tournament:" + this.props.valueProps.tournament);
      this.props.nextStep();
    }
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
        <form onSubmit={this.onSubmit}>
        <div className="container">
        
        <div class="col-md-8 m-auto">
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
              <label><h2>Select Tournament</h2></label>       
                 <select required value={valueProps.tournament} name="tournament" className="form-control custom-select-lg card--body__formSelect" onChange={ handleChange('tournament') }  >
                 <option>List of Tournaments</option>
                 {this.props.tournaments.map(tournament => (
                  <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
                 ))}
                </select>
        </div>
   
        <div className="form-group mt-2">
            <button type="submit" className="btn btn-primary btn-lg btn btn-deep-purple waves-effect waves-light float-right">
              Continue
            </button>
        </div>    

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

export default connect( mapStateToProps,{ getTournaments, createMessage } )(StepOneTournamentForm);