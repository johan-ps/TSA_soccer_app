import { Schedule } from '../../data/schedule';
import Activity from '../../models/activity';
import { CREATE_ACTIVITY, GET_ACTIVITIES, UPDATE_ACTIVITY, DELETE_ACTIVITY } from '../actions/schedule';

const INITIAL_STATE = [];

const scheduleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ACTIVITIES:
            return action.schedule;
        case CREATE_ACTIVITY:
            const newActivity = new Activity(
                action.activityData.id,
                action.activityData.type,
                action.activityData.status,
                action.activityData.location,
                action.activityData.phoneNum,
                action.activityData.date
            );
            // TODO: insert newActivity into correct position
            return [...state, newActivity];
        case UPDATE_ACTIVITY:
            const updatedActivityIndex = state.findIndex(activity => activity.id === action.activityData.id);
            const updatedActivity = new Activity(
                action.activityData.id,
                action.activityData.type,
                action.activityData.status,
                action.activityData.location,
                action.activityData.phoneNum,
                action.activityData.date
            );
            const newState = [...state];
            newState[updatedActivityIndex] = updatedActivity;
            return newState;
        case DELETE_ACTIVITY:
            return state.filter(activity => activity.id !== action.activityData.id);
        default:
            return state;
    }
}

export default scheduleReducer;