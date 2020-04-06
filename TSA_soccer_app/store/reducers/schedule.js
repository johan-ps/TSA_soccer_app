import { combineReducers } from 'redux';
import { Schedule } from '../../data/schedule';
import { CREATE_ACTIVITY } from '../actions/schedule';

const INITIAL_STATE = Schedule;

const scheduleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_ACTIVITY:
            return state;
        default:
            return state;
    }
}

export default scheduleReducer;