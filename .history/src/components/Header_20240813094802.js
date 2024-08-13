import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import icon from '../assets/icon.png';

const Header = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Clear the user state
    window.location.href = '/'; // Redirect to the home page
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
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
          <div className="user-info">
            <Link to={`/profile/${user.username}`} className="profile-link">
              <span>{user.username}</span>
              <img src={avatar} alt="avatar" className="avatar" />
            </Link>
            <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
            <div className='edit-article'>
              <Link to='/new-article' className='new-article-link'>New Article</Link>
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
