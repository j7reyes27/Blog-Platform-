import './Header.css'
import {Link} from 'react-router-dom'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  }

    return(
        <header className='header'>
        <h1>Realworld Booty</h1>
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