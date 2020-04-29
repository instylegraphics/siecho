import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches } from "../../actions/matches";
import { createMessage } from "../../actions/messages";

export class StepThreeMatchForm extends Component {
/* old method
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    
  };
*/

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  static propTypes = {
    getMatches: PropTypes.array.isRequired   
  };

  onSubmit = e => {
    console.log("step3 form submit");
    console.log("this.props.valueProps.match:" + this.props.valueProps.match);
    e.preventDefault();
    if ( this.props.valueProps.match == "" || typeof this.props.valueProps.match == "undefined" ) {
      this.props.createMessage({ matchNull: "Select a Match" });
    } else {
      console.log("success step1 -> next step");
      console.log("this.props.valueProps.match:" + this.props.valueProps.match);
      this.props.nextStep();
    }
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
      <main className="page-content">
        <form onSubmit={this.onSubmit}>
        <div className="container">
        <div class="col-md-8 m-auto">
        
        <div className="card card-body mt-4 mb-4">

        <div className="md-stepper-horizontal">
            <div className="md-step done">
              <div className="md-step-circle"><span>1</span></div>
              <div className="md-step-title">Tournament</div>
              <div className="md-step-bar-left"></div>
              <div className="md-step-bar-right"></div>
            </div>
            <div className="md-step done">
              <div className="md-step-circle"><span>2</span></div>
              <div className="md-step-title">Series</div>
              <div className="md-step-bar-left"></div>
              <div className="md-step-bar-right"></div>
            </div>
            <div className="md-step active editable">
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
            <label>Select Match - sid:{valueProps.series}:</label>          
               
               <select required value={valueProps.match} name="series" className="form-control custom-select-lg card--body__formSelect" onChange={handleChange('match')}>
               <option>List of Matches</option>
               {this.props.matches.map(matchlist => ( 
                  <option key={matchlist.id} value={matchlist.id}>Match {matchlist.match_order} </option>
               ))}
              </select>
          </div>
 
          <div className="form-group mt-2">
            <button type="button" className="btn btn-primary btn-lg btn btn-deep-purple waves-effect waves-light" onClick={this.back}>
              Back
            </button>
 
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
  matches: state.matches.matches,
});

export default connect( mapStateToProps,{ getMatches, createMessage } )(StepThreeMatchForm);