import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSeries } from "../../actions/series";

export class StepTwoSeriesForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  static propTypes = {
    getSeries: PropTypes.func.isRequired   
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
         <div className="card card-body mt-4 mb-4">
            <h1>Step 2: Pick a Series</h1>

           <div className="form-group">
            <label>Select Series :t- {valueProps.tournament}:</label>          
               <select required value={valueProps.series} name="series" className="form-control custom-select" onChange={handleChange('series')}>
                <option>Select Series</option>
               {this.props.series.map(series => (            
                  <option  key={series.id} value={series.id}>{series.name}</option>  
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
  series: state.series.series,
});

export default connect( mapStateToProps,{ getSeries } )(StepTwoSeriesForm);
 