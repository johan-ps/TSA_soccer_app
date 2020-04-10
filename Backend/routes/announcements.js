const express = require('express');
const router = express.Router();
const multer = require('multer');

const Announcement = require('../model/announcement');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '.' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    // fileFilter: fileFilter,
});

router.get('/', (req, res) => {
    Announcement.find({}, (err, announcements) => {
        if (err) {

        } else {
            res.send(announcements);
        }
    });
});

router.post('/add', upload.array('imageUrl', 3), (req, res) => {
    console.log(req.file);
    console.log(req.body)
    const newAnnouncement = new Announcement({
        date: req.body.date,
        description: req.body.description,
        type: req.body.type,
        author: req.body.author,
        imageUrl: 'http://192.168.2.23:3000/' + req.file.path,
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

module.exports = router;