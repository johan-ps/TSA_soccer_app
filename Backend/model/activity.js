const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    type: {
        type: String
    },
    status: {
        type: String,
    },
    location: {
        type: String,
    },
    phoneNum: {
        type: Number
    },
    date: {
        type: Date,
    },
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;