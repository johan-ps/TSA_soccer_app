const express = require('express');
const router = express.Router();
// const multer = require('multer');

const Announcement = require('../model/announcement');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, uniqueSuffix + '.' + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// var upload = multer({
//     storage: storage,
//     // limits: {
//     //     fileSize: 1024 * 1024 * 5
//     // },
//     // fileFilter: fileFilter,
// });

router.get('/', (req, res) => {
    Announcement.find({}, (err, announcements) => {
        if (err) {

        } else {
            res.send(announcements);
        }
    });
});

router.post('/add', (req, res) => {
    const newAnnouncement = new Announcement({
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        // imageUrl: 'http://192.168.2.23:3000/' + req.file.path,
        // imageUrl: 'http://10.0.2.2:3000/' + req.file.path,
    });
    Announcement.create(newAnnouncement, (err, createdAnnouncement) => {
        if (err) {
            res.send(err);
        } else {
            res.send(createdAnnouncement);
        }
    });
});

router.put('/update', (req, res) => {
    Announcement.findByIdAndUpdate(req.body.announcementId, req.body.announcement, {new: true}, function(err, updatedAnnouncement) {
        if (err) {

        } else {
            res.send(updatedAnnouncement);
        }
    });
});

router.delete('/delete', (req, res) => {
    Announcement.findByIdAndDelete(req.body.announcementId, function(err, announcementDeleted) {
        if (err) {

        } else {
            res.send(announcementDeleted);
        }
    })
})

module.exports = router;