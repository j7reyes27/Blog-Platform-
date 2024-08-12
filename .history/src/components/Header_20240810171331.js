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

    return(
        <header className='header'>
        <h1><Link to='/' className='home-link'>Realworld Booty</Link></h1>
        <nav>
          {user ? (
            <div className='user-info'>
              <Link to={`/profile/${user.username}`} className='profile-link'>
                <span>{user.username}</span>
            </div>
          )}
        </nav>
      <div>
       <div className='auth-buttons'>
        <Link to='/sign-in' className='btn sign-in'>Sign In</Link>
        <Link to='/sign-up' className='btn sign-up'>Sign Up</Link>
        </div> 
      </div>
      </header>
    )
}

export default Header; 

//create sign in and sign up pages. 