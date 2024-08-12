import './Header.css'

const Header = () => {
    return(
        <header className='header'>
        <h1>Realworld Booty</h1>
      <div>
       <div className='auth-buttons'>
        <Link to='/sign-in' className='btn sign-in'>Sign In</Link>
        Sign in</div> 
       <button className='auth-buttons'>Sign up</button>
      </div>
      </header>
    )
}

export default Header; 