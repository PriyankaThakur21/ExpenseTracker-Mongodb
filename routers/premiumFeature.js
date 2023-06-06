const express = require('express');
const router = express.Router();

const PremiumFeatureController = require('../controllers/premiumFeature');
const UserController = require('../controllers/users');

router.get('/leaderboard', PremiumFeatureController.getLeaderboard);

router.get('/download', UserController.decodeToken, PremiumFeatureController.downloadfile);

module.exports = router;