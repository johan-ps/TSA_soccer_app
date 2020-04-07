const express = require('express');
const router = express.Router();

const Announcement = require('../model/announcement');

router.get('/', (req, res) => {
    Announcement.find({}, (err, announcements) => {
        if (err) {

        } else {
            res.send(announcements);
        }
    });
});

router.post('/add', (req, res) => {
    const newAnnouncement = req.body.announcement;
    Announcement.create(newAnnouncement, (err, createdAnnouncement) => {
        if (err) {
            res.send(err);
        } else {
            res.send(createdAnnouncement);
        }
    });
});

module.exports = router;