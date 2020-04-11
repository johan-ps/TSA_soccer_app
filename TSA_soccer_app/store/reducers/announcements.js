import { Announcements } from '../../data/announements';
import Announcement from '../../models/announcement';
import { CREATE_ANNOUNCEMENT, GET_ANNOUNCEMENTS, UPDATE_ANNOUNCEMENT, DELETE_ANNOUNCEMENT } from '../actions/announcements';

const INITIAL_STATE = Announcements;

const announcementReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ANNOUNCEMENTS:
            return action.announcements;
        case CREATE_ANNOUNCEMENT:
            const newAnnouncement = new Announcement(
                action.announcementData.id,
                action.announcementData.date,
                action.announcementData.title,
                action.announcementData.description,
                action.announcementData.type,
                action.announcementData.author,
                action.announcementData.imageUrl
            );
            return [newAnnouncement, ...state];
        case UPDATE_ANNOUNCEMENT:
            const announcementUpdatedIndex = state.findIndex(announcement => announcement.id === action.announcementData.id);
            const updatedAnnouncement = new Announcement(
                action.announcementData.id,
                action.announcementData.date,
                action.announcementData.title,
                action.announcementData.description,
                action.announcementData.type,
                action.announcementData.author,
                action.announcementData.imageUrl
            );
            console.log(updatedAnnouncement);
            const newState = [...state];
            newState[announcementUpdatedIndex] = updatedAnnouncement;
            return newState;
        case DELETE_ANNOUNCEMENT:
            return state.filter(announcement => announcement.id !== action.announcementData.id);
        default:
            return state;
    }
}

export default announcementReducer;