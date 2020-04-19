const express = require('express');
const router = express.Router();

const Activity = require('../model/activity');

router.get('/', function(req, res) {
    Activity.find({}, function(err, foundActivities) {
        if (err) {

        } else {
            res.send(foundActivities);
        }
    });
});

router.post('/add', function(req, res) {
    const newActivity = new Activity({
        type: req.body.type,
        status: req.body.status,
        location: req.body.location,
        phoneNum: req.body.phoneNum,
        date: req.body.date,
    });
    Activity.create(newActivity, (err, createdActivity) => {
        if (err) {

        } else {
            res.send(createdActivity);
        }
    });
});

router.put('/update', function(req, res) {
    const updatedActivity = {
        type: req.body.type,
        status: req.body.status,
        location: req.body.location,
        phoneNum: req.body.phoneNum,
        date: req.body.date,
    }
    Activity.findOneAndUpdate(req.body.activityId, updatedActivity, {new: true}, function(err, updatedActivity) {
        if (err) {

        } else {
            res.send(updatedActivity);
        }
    });
});

router.delete('/delete', function(req, res) {
    Activity.findOneAndDelete(req.body.activityId, function(err, deletedActivity) {
        if (err) {

        } else {
            res.send(deletedActivity);
        }
    });
});

module.exports = router;