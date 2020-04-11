const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    date: {
        type: Date,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
    },
    author: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;