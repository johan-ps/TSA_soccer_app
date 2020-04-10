import Announcement from '../../models/announcement';
// import environmentUrl from '../../../config';
const environmentUrl = '192.168.2.23:3000';//'10.0.2.2:3000'; //192.168.2.23:3000

export const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT';
export const GET_ANNOUNCEMENTS = 'GET_ANNOUNCEMENT';

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
                loadedAnnouncements.push(new Announcement(announcement._id, new Date(announcement.date), announcement.description,
                    announcement.type, announcement.author, announcement.imageUrl));
            });
            dispatch({type: GET_ANNOUNCEMENTS, announcements: loadedAnnouncements});
        } catch (err) {
            throw err;
        }
    }
}

export const createAnnouncement = (imageRes, caption) => {
    return async dispatch => {
        try {
            console.log(imageRes)
            const formData = new FormData();
            formData.append('imageUrl', {
                name: imageRes.fileName,
                type: imageRes.type,
                uri: imageRes.uri,
            });
            // formData.append('imageUrl', imageRes.fileName)
            formData.append('date', new Date());
            formData.append('description', caption);
            formData.append('type', 'info');
            formData.append('author', 'Gryffin');
            const response = await fetch(`http://${environmentUrl}/api/announcements/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data', //'application/json',
                },
                body: formData,
            });
            console.log('response')

            const resData = await response.json();
            console.log(resData)

            dispatch({
                type: CREATE_ANNOUNCEMENT,
                announcementData: {
                    id: resData._id,
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