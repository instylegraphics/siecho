import React, { Component } from 'react';
import StepOneTournamentForm from './stepOne';
import StepTwoSeriesForm from './stepTwo';
import StepThreeSeriesForm from './stepThree';
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
    const valueProps = { tournament, series, match };
    console.log("return props from main page");
    console.log(this.props);
     
    switch (step) {
      case 1:
        return (
          <StepOneTournamentForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
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
          <StepThreeSeriesForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            valueProps={valueProps}
          />
        );       
      case 4:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            valueProps={valueProps}
          />
        );
      case 5:
        return <Success />;
    }
  }
}


export default matchAdminForm;