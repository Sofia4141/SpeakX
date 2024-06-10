const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const Tweet = require('../models/Tweet');

// Create a tweet
router.post('/', auth, async (req, res) => {
  try {
    const newTweet = new Tweet({ user: req.user.id, text: req.body.text });
    const tweet = await newTweet.save();
    res.json(tweet);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get tweets of followed users
router.get('/timeline', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('following', 'id');
    const tweets = await Tweet.find({ user: { $in: user.following } }).sort({ createdAt: -1 });
    res.json(tweets);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
