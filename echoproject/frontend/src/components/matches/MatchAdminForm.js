import React, { Component } from 'react';

import StepOneTournamentForm from './stepOne';
import StepTwoSeriesForm from './stepTwo';
import StepThreeMatchForm from './stepThree';
import StepFourMatchAdminForm from './stepFour';
import ConfirmMatchForm from './confirmMatch';
import Confirm from './Confirm';

import Success from './Success';

export class matchAdminForm extends Component {

  state = {
    step: 1,
    tournament: "",
    series: "",
    match: "",
    game: "",
    gameName: ""
  };
  
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };
  
  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // save game id 
  get_gameID = ( gid, gname ) => {
    const { game, gameName } = this.state;
    this.setState({
      game: gid,
      gameName: gname
    });
  };
  
  // handlechange step 1
   handleChange_step1 = ( tournamentid ) => {
    const { tournament } = this.state;
    this.setState({
      tournament: tournamentid 
    });
  };
   
  // Handle fields change, step 2 to 4
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
    //this.setState({ [e.target.name]: e.target.value });
  };
 
  render() {
    const { step } = this.state;
    const { tournament, series, match, game, gameName } = this.state;
    const valueProps = { tournament, series, match, game, gameName };
     
    switch (step) {
      case 1:
        return (
          <StepOneTournamentForm
            nextStep={this.nextStep}
            handleChange_step1={this.handleChange_step1}
            get_gameID={this.get_gameID}
            valueProps={valueProps}
          />
        );
      case 2:
        return (
          <StepTwoSeriesForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            valueProps={valueProps}
          />
        );
      case 3:
        return (
          <StepThreeMatchForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            valueProps={valueProps}
          />
        );
      case 4:
        return (
          <ConfirmMatchForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            valueProps={valueProps}
          />
        );                
      case 5:
        return (
          <StepFourMatchAdminForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            valueProps={valueProps}
          />
        );            
      case 6:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            valueProps={valueProps}
          />
        );
      case 7:
        return <Success />;
    }
  }
}

export default matchAdminForm;