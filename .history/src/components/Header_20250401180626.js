import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../assets/icon.png';

const Header = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const avatar = user?.avatar ? user.avatar : icon;

  // When clicking "Realworld Blog", push a new history entry with the URL "/" (with no query params)
  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/", { replace: false });
  };

  return (
    <header className="header">
      <h1>
        <Link to="/" onClick={handleHomeClick} className="home-link">
          Realworld Blog
        </Link>
      </h1>
      <nav>
        {user ? (
          <div className="user-section">
            <div className='edit-article'>
              <Link to='/new-article' className='new-article-link'>Create article</Link>
            </div>
            <div className="user-info">
              <Link to={`/profile/${user.username}`} className="profile-link">
                <span>{user.username}</span>
                <img src={avatar} alt="avatar" className="avatar" />
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/sign-in" className="btn sign-in">Sign In</Link>
            <Link to="/sign-up" className="btn sign-up">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
