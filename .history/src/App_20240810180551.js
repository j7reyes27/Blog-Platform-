import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import ArticlePage from './pages/ArticlePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

function App() {

    return(
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/article/:slug' element={<ArticlePage/>} />
                <Route path='/sign-in' element={<Login/>} />
                <Route path='sign-up' element={<Register/>} />
                <Route path='/profile/:username' element={<Profile/>}/>
            </Routes>
        </Router>
    )
}

export default App;
