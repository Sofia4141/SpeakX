import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <nav>
      <Link to="/timeline">Timeline</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
