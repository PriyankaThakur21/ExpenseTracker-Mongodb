const express = require('express');
const router = express.Router();

const PremiumFeatureController = require('../controllers/premiumFeature');

router.get('/leaderboard', PremiumFeatureController.getLeaderboard);

module.exports = router;