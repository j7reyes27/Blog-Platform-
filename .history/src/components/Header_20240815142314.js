import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import icon from '../assets/icon.png';

const Header = () => {
  // Safely parse the stored user data
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove the token if stored separately
    setUser(null); // Clear the user state
    window.location.href = '/'; // Redirect to the home page
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const avatar = user?.avatar ? user.avatar : icon;

  return (
    <header className="header">
      <h1>
        <Link to="/" className="home-link">Realworld Blog</Link>
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
}

export default Header;
