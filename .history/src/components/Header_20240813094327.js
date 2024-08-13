import './Header.css'
import {Link} from 'react-router-dom'
import icon from '../assets/icon.png'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  const avatar = user?.avatar ? user.avatar : icon;
  //This line sets the avatar variable. If the user object exists and has an avatar property, it uses that. Otherwise, it falls back to the default icon image.

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
          </div>
          //user ? () : () we are using a if else 
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

//create sign in and sign up pages. 