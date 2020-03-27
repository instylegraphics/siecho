import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches } from "../../actions/matches";
import { getScenes } from "../../actions/scenes";
import { getSeriesDetails, updateSeriesEnd } from "../../actions/series";

 export class CasterViewSeries extends Component {

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
 
  static propTypes = {
    getSeriesDetails: PropTypes.func.isRequired,
    updateSeriesEnd: PropTypes.func.isRequired,
    getMatches: PropTypes.func.isRequired,
    getScenes: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log("componentDidMount - casterViewSeries");
    console.log('valueProps.seriesid');
    console.log(this.props.valueProps.seriesid);
    console.log('valueProps.tournament');
    console.log(this.props.valueProps.tournament);
    
    this.props.getMatches(this.props.valueProps.seriesid);
    this.props.getSeriesDetails(this.props.valueProps.tournament)
    this.props.getScenes();
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
             
              {this.props.valueProps.seriesid ?
                  <div class="empty">
          <h2>Current Matches for This Series</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Match Order</th>
                  <th>Match Winner</th>
                  <th>Ended</th>
                  <th>Active</th>
                   
                </tr>
              </thead>
              <tbody>
                {this.props.matches.map(listmatch => (
                  <tr key={listmatch.id}>
                    <td>{listmatch.id}</td>
                    <td>{listmatch.match_order}</td>
                    <td>{listmatch.winner.short_name}</td>                    
                    <td>{String(listmatch.ended)}</td>
                    <td>{String(listmatch.active)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
              : <div>
              <h2>No Matches Created for this Series</h2>
              </div>         
             }
             
             
             
             
                        
              {this.props.valueProps.seriesid ?
                  <div class="empty">
          <h2>Current Scenes</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Scene Name</th>
                  <th>Title</th>
                  <th>Desc 1</th>
                  <th>Enabled</th>
                   
                </tr>
              </thead>
              <tbody>
                {this.props.scenes.map(listscenes => (
                  <tr key={listscenes.id}>
                    <td>{listscenes.id}</td>
                    <td>{listscenes.name}</td>
                    <td>{listscenes.title}</td>                    
                    <td>{listscenes.desc1}</td>
                    <td>{String(listscenes.enabled)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
              : <div>
              <h2>No Scenes Created</h2>
              </div>         
             }
             
             
             
             {this.props.valueProps.tournament ?
                  <div class="empty">
          <h2>Current Series for This Tournament</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Series Order</th>
                  <th># of Matches</th>
                  <th>Series Winner</th>
                  <th>Ended</th>
                  <th>Active</th>
                   
                </tr>
              </thead>
              <tbody>
                {this.props.series.map(listseries => (
                  <tr key={listseries.id}>
                    <td>{listseries.id}</td>
                    <td>{listseries.name}</td>
                    <td>{listseries.series_order}</td>
                    <td>{listseries.best_of}</td>
                    <td>{listseries.winner}</td>                    
                    <td>{String(listseries.ended)}</td>
                    <td>{String(listseries.active)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
              : <div>
              <h2>No Series Created for this Tournament</h2>
              </div>         
             }
             
                         
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.back}>
              Back
            </button>
          </div>
           <div className="form-group">  
              <button
              onClick={(e) => {
              console.log("this.props.valueProps.seriesid:" + this.props.valueProps.seriesid);
              this.props.updateSeriesEnd(this.props.valueProps.seriesid);
              }}
              className="btn btn-danger btn-sm">End Series
              </button>
           </div>           
                      
         </div>
        </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({
  series: state.series.series,
  matches: state.matches.matches,
  scenes: state.scenes.scenes
});

export default connect( mapStateToProps,{ getSeriesDetails, updateSeriesEnd, getMatches, getScenes } )(CasterViewSeries);