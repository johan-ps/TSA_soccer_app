import Announcement from '../../models/announcement';

import { sortByDate } from '../../Util/utilities';

const environmentUrl = '192.168.2.23:3000';//'10.0.2.2:3000'; //192.168.2.23:3000

export const GET_ANNOUNCEMENTS = 'GET_ANNOUNCEMENT';
export const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT';
export const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT';
export const DELETE_ANNOUNCEMENT = 'DELETE_ANNOUNCEMENT';

export const getAnnouncements = () => {
    return async dispatch => {
        try {
            const response = await fetch(`http://${environmentUrl}/api/announcements/`);

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const resData = await response.json();
            const loadedAnnouncements = [];
            resData.forEach((announcement) => {
                loadedAnnouncements.push(new Announcement(announcement._id, new Date(announcement.date), announcement.title,
                    announcement.description, announcement.type, announcement.author, announcement.imageUrl));
            });
            loadedAnnouncements.sort((a, b) => (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0));
            dispatch({type: GET_ANNOUNCEMENTS, announcements: loadedAnnouncements});
        } catch (err) {
            throw err;
        }
    }
}

export const createAnnouncement = (title, imageUrl, caption) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://${environmentUrl}/api/announcements/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: new Date(),
                    title: title,
                    description: caption,
                    type: 'info',
                    author: 'Gryffin',
                    imageUrl: imageUrl,
                }),
            });

            const resData = await response.json();

            dispatch({
                type: CREATE_ANNOUNCEMENT,
                announcementData: {
                    id: resData._id,
                    title: resData.title,
                    date: new Date(resData.date),
                    description: resData.description,
                    type: resData.type,
                    author: resData.author,
                    imageUrl: resData.imageUrl,
                },
            });
        } catch (err) {
            throw err;
        }
    };
}

export const updateAnnouncement = (id, title, imageUrl, caption, date) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://${environmentUrl}/api/announcements/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    announcementId: id,
                    announcement: {
                        date: date,
                        title: title,
                        description: caption,
                        type: 'info',
                        author: 'Gryffin',
                        imageUrl: imageUrl,
                    }
                })
            });

            if (!response.ok) {
                throw new Error ('Something went wrong')
            }

            const resData = await response.json();

            dispatch({
                type: UPDATE_ANNOUNCEMENT,
                announcementData: {
                    id: resData._id,
                    title: resData.title,
                    date: new Date(resData.date),
                    description: resData.description,
                    type: resData.type,
                    author: resData.author,
                    imageUrl: resData.imageUrl,
                },
            });
        } catch (err) {
            throw err;
        }
    }
}

export const deleteAnnouncement = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(`http://${environmentUrl}/api/announcements/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    announcementId: id
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const resData = await response.json();

            dispatch({
                type: DELETE_ANNOUNCEMENT,
                announcementData: {
                    id: resData._id,
                    title: resData.title,
                    date: new Date(resData.date),
                    description: resData.description,
                    type: resData.type,
                    author: resData.author,
                    imageUrl: resData.imageUrl,
                },
            })
        } catch (err) {
            throw err;
        }
    }
}