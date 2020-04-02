import { UPDATE_JOKE, UPDATE_POLLING_STATS } from "../actions/types.js";

const initialState = {
    joke: '',
    pollingStats: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_JOKE':
            return {...state, joke: action.joke};

        case 'UPDATE_POLLING_STATS':
            return {...state, pollingStats: action.stats};

        default:
            return state;
    }
}