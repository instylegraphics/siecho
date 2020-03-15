import React, { Component } from 'react';
import StepOneTournamentForm from './stepOne';
import StepTwoSeriesForm from './stepTwo';
import StepThreeMatchForm from './stepThree';
import Confirm from './Confirm';
import Success from './Success';

export class matchAdminForm extends Component {
  state = {
    step: 1,
    tournament: "",
    series: "",
    match: ""
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

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
    
    
  };
 

  render() {
    const { step } = this.state;
    const { tournament, series, match } = this.state;
    const matches = { tournament, series, match };
    console.log(this.props);
     
    switch (step) {
      case 1:
        return (
          <StepOneTournamentForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            matches={matches}
          />
        );
      case 2:
        return (
          <StepTwoSeriesForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            matches={matches}
          />
        );
      case 3:
        return (
          <StepThreeMatchForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            matches={matches}
          />
        );       
      case 4:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            matches={matches}
          />
        );
      case 5:
        return <Success />;
    }
  }
}


export default matchAdminForm;