// import environmentUrl from '../../../config';
const environmentUrl = '10.0.2.2:3000';

export const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT';

export const createAnnouncement = (imageUrl, caption) => {
    return async dispatch => {
        const response = await fetch(`http://${environmentUrl}/api/announcements/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                announcement: {
                    date: new Date(),
                    description: caption,
                    type: 'info',
                    author: 'Gryffin',
                    imageUrl: imageUrl,
                }
            })
        });

        const resData = await response.json();
        console.log(resData);

        dispatch({
            type: CREATE_ANNOUNCEMENT,
            announcementData: {
                id: 50,
                date: new Date(),
                description: caption,
                type: 'info',
                author: 'Gryffin',
                imageUrl: imageUrl,
            },
        });
    };
}