const express = require('express');
const router = express.Router();

const announcementsRouter = require('./announcements');
const activityRouter = require('./activity');

router.use('/announcements', announcementsRouter);
router.use('/activities', activityRouter);

module.exports = router;