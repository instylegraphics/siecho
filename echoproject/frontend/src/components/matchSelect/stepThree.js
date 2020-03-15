import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches } from "../../actions/matches";

export class StepThreeSeriesForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  static propTypes = {
    getMatches: PropTypes.func.isRequired   
  };
    
  componentDidMount() {
    this.props.getMatches(this.props.valueProps.series);
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
            <h1>Step 3: Pick Match</h1>

           <div className="form-group">
            <label>Select Match - series id:{valueProps.series}:</label>          
               <select required value={valueProps.match} name="series" className="form-control custom-select" onChange={handleChange('match')}>
                <option>Select Match</option>
               {this.props.matches.map(match => ( 
                  <option  key={match.id} value={match.id}>Match {match.match_order} for Series: {match.series.name} - Tournament: {match.series.tournament.name} </option>
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
  matches: state.matches.matches,
});

export default connect( mapStateToProps,{ getMatches } )(StepThreeSeriesForm);
 