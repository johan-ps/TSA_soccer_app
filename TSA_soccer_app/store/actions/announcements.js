export const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT';

export const createAnnouncement = (imageUrl, caption) => {
    return {
        type: CREATE_ANNOUNCEMENT,
        announcementData: {
            id: 50,
            date: new Date(),
            description: caption,
            type: 'info',
            author: 'Gryffin',
            imageUrl: imageUrl,
        },
    };
}