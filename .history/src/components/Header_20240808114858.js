import Header from './Header.css'

const Header = () => {
    return(
        <header className='header'>
        <h1>Realworld Booty</h1>
      <div>
       <button className='auth-buttons'>Sign in</button> 
       <button className='auth-buttons'>Sign up</button>
      </div>
      </header>
    )
}

export default Header; 