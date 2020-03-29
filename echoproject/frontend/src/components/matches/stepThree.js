import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatchesDetails } from "../../actions/matches";

export class StepThreeMatchForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  static propTypes = {
    getMatchesDetails: PropTypes.func.isRequired   
  };
    
  componentDidMount() {
    this.props.getMatchesDetails(this.props.valueProps.series);
    console.log('prop series id :');
    console.log(this.props.valueProps.series);
  }
  
  render() {
    const { valueProps, handleChange } = this.props;
    console.log('step3: matches props');
    console.log(this.props);
 
    return (
     
        <React.Fragment>
         <div className="card card-body mt-4 mb-4">
            <h1>Step 3: Pick a Match</h1>

           <div className="form-group">
            <label>Select Match - series id:{valueProps.series}:</label>          
               <select required value={valueProps.match} name="series" className="form-control custom-select" onChange={handleChange('match')}>
                <option>Select Match</option>
               {this.props.matchesdetails.map(matchlist => ( 
                  <option key={matchlist.id} value={matchlist.id}>Match {matchlist.match_order} for Series: {matchlist.series.name} </option>
               ))}
              </select>
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
const mapStateToProps = state => ({
  matchesdetails: state.matchesdetails.matchesdetails,
});

export default connect( mapStateToProps,{ getMatchesDetails } )(StepThreeMatchForm);
 