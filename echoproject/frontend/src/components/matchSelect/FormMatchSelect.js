import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches} from "../../actions/matches";
 


export class FormMatchSelect extends Component {
  state = {
    tournament: "",
    series: "",
    match: ""
  };

  static propTypes = {
    getMatches: PropTypes.func.isRequired   
  };
    
  componentDidMount() {
    this.props.getMatches();
    console.log("1st mount props:");
    console.log(this.props);
  }
    
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { tournament, series, match } = this.state;
    const matches = { tournament, series, match };
    //this.props.getMatches(matches);

    console.log(matches);
    console.log("tournament:" + matches.tournament);
    console.log("series:" + matches.series);
    console.log("match:" + matches.match);
    
    this.setState({
    tournament: "",
    series: "",
    match: ""
    });
  };

  render() {
    const { tournament, series, match } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        { console.log(this.props) }
        <h2>Select Match</h2>
        <form onSubmit={this.onSubmit}>
          
           <div className="form-group">
            <label>tournament</label>
            <input
              className="form-control"
              type="number"
              min="0" 
              max="100" 
              step="1"
              name="tournament"
              onChange={this.onChange}
              value={tournament}
            />
          </div>  
  
          <div className="form-group">
            <label>series</label>
            <input
              className="form-control"
              type="number"
              min="0" 
              max="100" 
              step="1"
              name="series"
              onChange={this.onChange}
              value={series}
            />
          </div>
          
          <div className="form-group">
            <label>match</label>
            <input
              className="form-control"
              type="number"
              min="0" 
              max="100" 
              step="1"
              name="match"
              onChange={this.onChange}
              value={match}
            />
          </div>
 
  
                             
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Edit Match
            </button>
          </div>
          
        </form>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.matches.matches,
});

export default connect( 
  mapStateToProps,
    { getMatches } 
)(FormMatchSelect);