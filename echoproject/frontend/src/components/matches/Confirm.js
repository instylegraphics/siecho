import React, { Component } from 'react';

export class Confirm extends Component {
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
    const {
      values: { firstName, lastName, email, occupation, city, bio }
    } = this.props;
    return (
     
        <React.Fragment>
         <div className="card card-body mt-4 mb-4">
          <h1>Confirm User Data</h1>
          <p><strong>firstName:</strong> {firstName}</p>
          <p><strong>lastName:</strong> {lastName}</p>
          <p><strong>email:</strong> {firstName}</p>
          <p><strong>occupation:</strong> {occupation}</p>
          <p><strong>city:</strong> {city}</p>
          <p><strong>bio:</strong> {bio}</p>
          <br />
 
           <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.back}>
              Back
            </button>
          </div>
 
           <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.continue}>
              Confirm & Continue
            </button>
          </div>
          
  
        </div>
        </React.Fragment>
    
    );
  }
}

export default Confirm;