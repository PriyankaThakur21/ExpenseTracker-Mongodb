const express = require('express');
const router = express.Router();

const PremiumFeatureController = require('../controllers/premiumFeature');
const UserController = require('../controllers/users');

router.get('/leaderboard', PremiumFeatureController.getLeaderboard);

module.exports = router;