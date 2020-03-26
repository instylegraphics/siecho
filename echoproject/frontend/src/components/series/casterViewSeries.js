import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches } from "../../actions/matches";

 export class CasterViewSeries extends Component {

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
 
  static propTypes = {
    getMatches: PropTypes.func.isRequired   
  };

  componentDidMount() {
    console.log("componentDidMount - casterViewSeries");
    console.log('valueProps.seriesid');
    console.log(this.props.valueProps.seriesid);
    this.props.getMatches(this.props.valueProps.seriesid);
  };
  
  render() {
 
    const { valueProps } = this.props;
    console.log("render casterViewSeries caster view");
    console.log('props');
    console.log(this.props);
    console.log('valueProps');
    console.log(this.props.valueProps);
    //console.log("view:" + view);
    
    return (
       
        <React.Fragment>
         <div className="card card-body mt-4 mb-4">
            <h1>Caster View</h1>
            <p>HELLO</p>
            
            
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.back}>
              Back
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

export default connect( mapStateToProps,{ getMatches } )(CasterViewSeries);