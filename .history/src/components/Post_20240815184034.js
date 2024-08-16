import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Post.css';

const Post = ({ article }) => {
    const [isFavorited, setIsFavorited] = useState(article.favorited);
    const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);

    const handleFavoriteClick = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to favorite articles.');
            return;
        }

        try {
            if (isFavorited) {
                // If already favorited, unfavorite it (DELETE request)
                const response = await axios.delete(`https://api.realworld.io/api/articles/${article.slug}/favorite`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setIsFavorited(false);
                setFavoritesCount(favoritesCount - 1);
            } else {
                // If not favorited, favorite it (POST request)
                const response = await axios.post(`https://api.realworld.io/api/articles/${article.slug}/favorite`, {}, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setIsFavorited(true);
                setFavoritesCount(favoritesCount + 1);
            }
        } catch (error) {
            console.error('Error favoriting/unfavoriting article:', error);
        }
    };

    return (
        <div className='post'>
            <div className='post-header'>
                <div className="post-title-container">
                    <Link to={`/article/${article.slug}`} className="post-title-link">
                        <h2 className="post-title">{article.title}</h2>
                    </Link>
                    <div className='post-likes' onClick={handleFavoriteClick}>
                        <span className={`like-icon ${isFavorited ? 'liked' : ''}`}>&#10084;</span>
                        <span className='like-count'>{favoritesCount}</span>
                    </div>
                </div>
                <div className='post-meta'>
                    <img src={article.author.image} alt={article.author.username} className='author-image' />
                    <div className='author-info'>
                        <span className='post-author'>{article.author.username}</span>
                        <span className='post-date'>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <p className='post-description'>{article.description}</p>
            <div className="post-tags">
                {article.tagList.map((tag, index) => (
                    <span key={index} className="post-tag">{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default Post;
