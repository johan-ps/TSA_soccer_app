import { Announcements } from '../../data/announements';
import Announcement from '../../models/announcement';
import { CREATE_ANNOUNCEMENT, GET_ANNOUNCEMENTS } from '../actions/announcements';

const INITIAL_STATE = Announcements;

const announcementReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ANNOUNCEMENTS:
            return action.announcements;
        case CREATE_ANNOUNCEMENT:
            const newAnnouncement = new Announcement(action.announcementData.id, action.announcementData.date,
                action.announcementData.description, action.announcementData.type, action.announcementData.author,
                action.announcementData.imageUrl);
            return [newAnnouncement, ...state];
        default:
            return state;
    }
}

export default announcementReducer;