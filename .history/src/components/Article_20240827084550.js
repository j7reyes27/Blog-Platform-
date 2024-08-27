import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Article.css';

const Article = ({ article }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showTooltip, setShowTooltip] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://api.realworld.io/api/articles/${article.slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="article-container">
      <div className="article-header">
        <div className="article-title-likes">
          <h1>{article.title}</h1>
          <div className="article-likes">
            <span className={`like-icon ${article.favorited ? 'liked' : ''}`}>&#10084;</span>
            <span className="like-count">{article.favoritesCount}</span>
          </div>
        </div>

        <div className="author-info">
          <div className="author-details">
            <p>{article.author.username}</p>
            <p className="article-date">{new Date(article.createdAt).toLocaleDateString()}</p>
          </div>
          <img
            src={article.author.image || 'https://via.placeholder.com/50'}
            alt={article.author.username}
            className="author-avatar"
          />
        </div>
      </div>

      <div className="tags-description">
        <div className="tags">
          {article.tagList.map((tag, index) => (
            <span key={index} className="post-tag">{tag}</span>
          ))}
        </div>

        <div className="description">
          <div className="description-text">
            {article.description}
          </div>
          {user && user.username === article.author.username && (
            <div className="article-actions">
              <button onClick={handleEdit} className="btn-edit">
                Edit
              </button>
              <button onClick={toggleTooltip} className="btn-delete">
                Delete
              </button>
              {showTooltip && (
                <div className="tooltip">
                  <p>Are you sure you want to delete this article?</p>
                  <div className="tooltip-actions">
                    <button onClick={toggleTooltip} className="tooltip-cancel-btn">No</button>
                    <button onClick={handleDelete} className="tooltip-confirm-btn">Yes</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="article-body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Article;
