import { environmentUrl } from '../../config';
import Activity from '../../models/activity';

export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';

export const getActivities = () => {
    return async dispatch => {
        try {
            const response = await fetch(`http://${environmentUrl}/api/activities/`);

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const resData = await response.json();
            
            const loadedActivities = [];
            resData.forEach(activity => {
                loadedActivities.push(new Activity(
                    activity._id,
                    activity.type,
                    activity.status,
                    activity.location,
                    activity.phoneNum,
                    new Date(activity.date)
                ))
            })

            dispatch({type: GET_ACTIVITIES, schedule: loadedActivities});
        } catch (err) {
            throw err;
        }
    }
}

export const createActivity = (type, status, location, phoneNum, date) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://${environmentUrl}/api/activities/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: type,
                    status: status,
                    location: location,
                    phoneNum: phoneNum,
                    date: date
                }),
            });

            const resData = await response.json();

            dispatch({
                type: CREATE_ACTIVITY,
                activityData: {
                    id: resData._id,
                    type: resData.type,
                    status: resData.status,
                    location: resData.location,
                    phoneNum: resData.phoneNum,
                    date: new Date(resData.date)
                },
            });
        } catch (err) {
            throw err;
        }
    };
}

export const updateActivity = (id, type, status, location, phoneNum, date) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://${environmentUrl}/api/activities/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activityId: id,
                    activity: {
                        type: type,
                        status: status,
                        location: location,
                        phoneNum: phoneNum,
                        date: date
                    }
                })
            });

            if (!response.ok) {
                throw new Error ('Something went wrong')
            }

            const resData = await response.json();

            dispatch({
                type: UPDATE_ACTIVITY,
                activityData: {
                    id: resData._id,
                    type: resData.type,
                    status: resData.status,
                    location: resData.location,
                    phoneNum: resData.phoneNum,
                    date: new Date(resData.date)
                },
            });
        } catch (err) {
            throw err;
        }
    }
}

export const deleteActivity = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://${environmentUrl}/api/activities/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activityId: id
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();

            dispatch({
                type: DELETE_ACTIVITY,
                activityData: {
                    id: resData._id,
                    type: resData.type,
                    status: resData.status,
                    location: resData.location,
                    phoneNum: resData.phoneNum,
                    date: new Date(resData.date)
                },
            })
        } catch (err) {
            throw err;
        }
    }
}