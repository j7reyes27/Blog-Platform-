import React from 'react';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import ArticlePage from './pages/ArticlePage'

function App() {

    return(
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/article/:slug' element={<ArticlePage/>} />
            </Routes>
        </Router>
    )
}

export default App;
