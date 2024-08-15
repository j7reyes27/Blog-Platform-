import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle'; // Import EditArticle component

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/article/:slug' element={<ArticlePage />} />
                <Route path='/sign-in' element={<Login />} />
                <Route path='/sign-up' element={<Register />} />
                <Route path='/profile/:username' element={<Profile />} />
                <Route path='/new-article' element={<NewArticle />} />
                <Route path="/edit-article/:slug" element={<EditArticle />} /> {/* This is the edit route */}
            </Routes>
        </Router>
    );
}

export default App;
