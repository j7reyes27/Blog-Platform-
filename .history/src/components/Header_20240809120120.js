import './Header.css'
import {Link} from 'react-router-dom'

const Header = () => {
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