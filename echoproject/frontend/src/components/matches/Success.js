import React, { Component } from 'react';

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
        <React.Fragment>
        <div className="card card-body mt-4 mb-4">
            <h1>Success</h1>
            <h2>Thank You For Your Submission</h2>
            <p>You will get an email with further instructions</p>
          
          
         </div> 
        </React.Fragment>
    );
  }
}

export default Success;