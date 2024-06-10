import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from './Tweet';

const Timeline = () => {
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    try {
      const res = await axios.get('/api/tweets/timeline', { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setTweets(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div>
      <Tweet getTweets={getTweets} />
      <div>
        {tweets.map((tweet) => (
          <div key={tweet._id}>
            <p>{tweet.text}</p>
            <small>by {tweet.user.username}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
