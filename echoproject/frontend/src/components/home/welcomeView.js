import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
 

export class WelcomeView extends Component {
  static propTypes = {
 
  };

  componentDidMount() {
 
  }

  render() {
    return (
      <Fragment>
      <main className="page-content">
        <div className="container-fluid">      
      
           
      <div className="overlay"></div>
      <div className="container">
        <h1 className="cursive"><img className="img-fluid" src="./static/img/streaminteractive-logo.png" alt="Stream Interactive" /></h1>
        <div className="mailing-list">
          <h3 className="mailing-list-heading">CLOUD-BASED STREAM PRODUCTION MADE SIMPLE.</h3>
          <div className="row">
           
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; 2020 Stream Interactive.</p>
            </div>
            <div className="col-md-6">
              <p className="credit">MADE WITH SOME HAMMERS.</p>
               
            </div>
          </div>
        </div>
     
    </div>
    
    
        </div>
      </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
 
});

export default WelcomeView;
