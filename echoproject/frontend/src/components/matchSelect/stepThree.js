import React, { Component } from 'react';


export class StepTwoSeriesForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { matches, handleChange } = this.props;
    return (
     
        <React.Fragment>
         <div className="card card-body mt-4 mb-4">
            <h1>Pick Match</h1>
            
         <div className="form-group">
            <label>match</label>
            <input 
              className="form-control"
              type="text"
              name="match"
              onChange={handleChange('match')}
              value={matches.match}
            />
          </div>
          <br />

          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.back}>
              Back
            </button>
          </div>
 
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

export default StepTwoSeriesForm;