import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches, updateMatches } from "../../actions/matches";

export class StepFourMatchAdminForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  
  onSubmit = e => {
    e.preventDefault();
    //this.props.addSeries(series);
 
    this.setState({
      tournament: "",
      name: "",
      series_order: "",
      team_one: "",
      team_two: "",
      best_of: ""
    });
  };
  
  static propTypes = {
    updateMatches: PropTypes.func.isRequired   
  };
    
  componentDidMount() {
    //this.props.getMatches(this.props.valueProps.series);
    //console.log('valueProps - series id :');
    //console.log(this.props.valueProps.series);
  }
  
  render() {
    const { valueProps, handleChange } = this.props;
    console.log('step4 Match Admin: valueProps:');
    console.log(this.props);
 
        
    return (
     
        <React.Fragment>
         <div className="card card-body mt-4 mb-4">
            <h1>Match Editor</h1>

            <div className="form-group">
            <label>Room Code</label>
            <input
              className="form-control"
              type="text"
              name="room_code"
              onChange={handleChange('game_mode')}
              value={valueProps.room_code}
            />
          </div>       
            
 
           <div className="form-group">
            <label>Game Mode</label>          
               <select name="game_mode" className="form-control custom-select" onChange={handleChange('game_mode')}>
                <option>Select Game Mode</option>
                
              </select>
          </div>
          
           <div className="form-group">
            <label>Game Map</label>          
               <select name="game_map" className="form-control custom-select" onChange={handleChange('game_map')}>
                <option>Select Game Map</option>
                
              </select>
          </div>
          
 
          <div className="form-group">
            <label>Team One Side</label>          
               <select name="team_one_side" className="form-control custom-select" onChange={handleChange('team_one_side')}>
                <option>Select Team One Side</option>
                
              </select>
          </div>
 
            <div className="form-group">
            <label>Team One Score</label>
            <input
              className="form-control"
              type="number"
              min="0" 
              max="100" 
              step="1"
              name="team_one_score"
              onChange={handleChange('team_two_side')}
              value={valueProps.team_one_score}
            />
          </div> 
                   
          <div className="form-group">
            <label>Team Two Side</label>          
               <select name="team_two_side" className="form-control custom-select" onChange={handleChange('team_two_side')}>
                <option>Select Team Two Side</option>
                
              </select>
          </div>
           
           <div className="form-group">
            <label>Team Two Score</label>
            <input
              className="form-control"
              type="number"
              min="0" 
              max="100" 
              step="1"
              name="team_two_score"
              onChange={handleChange('team_two_score')}
              value={valueProps.team_two_score}
            />
          </div> 
          
           <div className="form-group">
            <label>Match Winner</label>          
               <select name="winner_match" className="form-control custom-select" onChange={handleChange('winner_match')}>
                <option>Select Match Winner</option>
                
              </select>
          </div>
          
                             
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.back}>
              Back
            </button>
          </div>
 
           <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Update Match
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

export default connect( mapStateToProps,{ updateMatches } )(StepFourMatchAdminForm);
 