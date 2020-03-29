import { GET_SERIES, GET_SERIES_DETAILS, UPDATE_SERIES_END, DELETE_SERIES, ADD_SERIES, CLEAR_SERIES } from "../actions/types.js";

const initialState = {
  series: [],
  seriesdetails: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SERIES:
      return {
        ...state,
        series: action.payload
      };
    case GET_SERIES_DETAILS:
      return {
        ...state,
        seriesdetails: action.payload
      };      

    case UPDATE_SERIES_END: {
      const series = state.series.map(el => {
          if (el.id === action.payload.id) {
              console.log("inside UPDATE_SERIES_END");
              console.log("action.payload.id:" + action.payload.id);
              console.log("action.payload.active:" + action.payload.active);
              console.log("action.payload.ended:" + action.payload.ended);
              console.log("action.payload:" + JSON.stringify(action.payload) );
              //active: action.payload.active;
              //ended: action.payload.ended;
              //const style = { el, [action.payload.property]: action.payload.value };
              
              //const style = { ...el, [action.payload.property]: action.payload.value };
              //const style = { 

              return {
              id: action.payload.id,
              name: action.payload.name,
              series_order: action.payload.series_order,
              team_one_score: action.payload.team_one_score,
              team_two_score: action.payload.team_two_score,
              best_of: action.payload.best_of,            
              active: action.payload.active,
              ended: action.payload.ended,
              tournament: action.payload.tournament  ,           
              team_one: action.payload.team_one,
              team_two: action.payload.team_two,
              winner: action.payload.winner              
               };
              //return { el, style };
          } else {
              console.log("else inside UPDATE_SERIES_END");
              console.log("el.id:" + el.id);
              return el;
              
          }
      });
  
      return { ...state, series };
    }
 

/*  
     case UPDATE_SERIES_END:
      return {
        ...state,
        series: {
        ...state.series,
        [action.payload.property]: action.payload.value 
        }
    
      };   
       
      
      return Object.assign({}, state,{series:action.payload})
      
      
      //const newItem = 3;
      return [                // make a new array
        ...state.slice(0, 2), // copy the first 2 items unchanged
        newItem,              // replace index 2 with newItem
        ...state.slice(3)     // copy the rest, starting at index 3
      ];
  
      
      
      /*
      return {
        ...state,
        series: state.series.filter(series => series.id === action.payload.seriesid )
        
      };
      
      
      return state.series((series, index) => {
          // alternatively: you could look for a specific index
          if( series.id === action.payload.seriesid ) {
            active: action.payload.active
            ended: action.payload.ended
          }
          // Leave every other item unchanged
          return series;
        });
      */  
    case DELETE_SERIES:
      return {
        ...state,
        series: state.series.filter(series => series.id !== action.payload)
      };
    case ADD_SERIES:
      return {
        ...state,
        series: [...state.series, action.payload]
      };
    case CLEAR_SERIES:
      return {
        ...state,
        series: []
      };
    default:
      return state;
  }
}
