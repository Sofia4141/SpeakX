const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const User = require('../models/User');

// Follow a user
router.post('/follow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) return res.status(404).json({ msg: 'User not found' });

    user.following.push(userToFollow.id);
    userToFollow.followers.push(user.id);

    await user.save();
    await userToFollow.save();

    res.json({ msg: 'User followed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Unfollow a user
router.post('/unfollow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userToUnfollow = await User.findById(req.params.id);

    if (!userToUnfollow) return res.status(404).json({ msg: 'User not found' });

    user.following = user.following.filter(following => following.toString() !== userToUnfollow.id);
    userToUnfollow.followers = userToUnfollow.followers.filter(follower => follower.toString() !== user.id);

    await user.save();
    await userToUnfollow.save();

    res.json({ msg: 'User unfollowed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
