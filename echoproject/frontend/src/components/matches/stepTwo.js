import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSeries } from "../../actions/series";
import { createMessage } from "../../actions/messages";

export class StepTwoSeriesForm extends Component {

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
    getSeries: PropTypes.array.isRequired   
  };

  onSubmit = e => {
    console.log("step2 form submit");
    console.log("this.props.valueProps.series:" + this.props.valueProps.series);
    e.preventDefault();
    if ( this.props.valueProps.series == "" || typeof this.props.valueProps.series == "undefined" ) {
      this.props.createMessage({ seriesNull: "Select a Series" });
    } else {
      console.log("success step1 -> next step");
      console.log("this.props.valueProps.series:" + this.props.valueProps.series);
      this.props.nextStep();
    }
  };
    
  componentDidMount() {
    this.props.getSeries(this.props.valueProps.tournament);
    console.log('tid:');
    console.log(this.props.valueProps.tournament);
  }
  
  render() {
    const { valueProps, handleChange } = this.props;
    console.log('series props');
    console.log(this.props);

    return (
      <React.Fragment>
      <main className="page-content">
        <form onSubmit={this.onSubmit}>
        <div className="container-fluid">
        <div class="col-md-8 m-auto">
        
        <div className="card card-body mt-4 mb-4">
                     
        <div className="md-stepper-horizontal">
            <div className="md-step done">
              <div className="md-step-circle"><span>1</span></div>
              <div className="md-step-title">Tournament</div>
              <div className="md-step-bar-left"></div>
              <div className="md-step-bar-right"></div>
            </div>
            <div className="md-step active editable">
              <div className="md-step-circle"><span>2</span></div>
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
            <label>Select Series - tid:{valueProps.tournament}:</label>          
               
               <select required value={valueProps.series} name="series" className="form-control custom-select-lg card--body__formSelect" onChange={handleChange('series')}>
               <option>List of Series</option>
               {this.props.series.map(series => (            
                  <option  key={series.id} value={series.id}>{series.name}</option>  
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
  series: state.series.series,
});

export default connect( mapStateToProps,{ getSeries, createMessage } )(StepTwoSeriesForm);