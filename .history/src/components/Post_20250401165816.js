import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Post.css';

const Post = ({ article }) => {
  const [isFavorited, setIsFavorited] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const token = localStorage.getItem('token');
  // (Removed fetchArticle effect so the like icon appears immediately based on the passed prop.)

  const handleFavoriteClick = async () => {
    if (!token) {
      alert('You need to be logged in to favorite articles.');
      return;
    }
    try {
      let response;
      if (isFavorited) {
        response = await axios.delete(`https://realworld.habsidev.com/api/articles/${article.slug}/favorite`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      } else {
        response = await axios.post(`https://realworld.habsidev.com/api/articles/${article.slug}/favorite`, {}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
      if (response.status === 200) {
        setIsFavorited(response.data.article.favorited);
        setFavoritesCount(response.data.article.favoritesCount);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error favoriting/unfavoriting article:', error.response || error.message);
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
          <img src={article.author.image || 'https://via.placeholder.com/40'} alt={article.author.username} className='author-image' />
          <div className='author-info'>
            <span className='post-author'>{article.author.username}</span>
            <span className='post-date'>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="post-tags">
        {article.tagList.map((tag, index) => (
          <span key={index} className="post-tag">{tag}</span>
        ))}
      </div>
      <p className='post-description'>{article.description}</p>
    </div>
  );
};

export default Post;
