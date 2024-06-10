import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${username}`);
        setUser(res.data);
        const tweetRes = await axios.get(`/api/tweets/user/${res.data._id}`);
        setTweets(tweetRes.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <button>Follow</button>
          <h2>Tweets</h2>
          <div>
            {tweets.map((tweet) => (
              <div key={tweet._id}>
                <p>{tweet.text}</p>
                <small>{tweet.createdAt}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
