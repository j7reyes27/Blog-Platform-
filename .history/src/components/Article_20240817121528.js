import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Article.css';

const Article = ({ article }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');

    if (confirmDelete) {
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
    }
  };

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`);
  };

  return (
    <div className="article-container">
      <div className="article-header">
        <h1>{article.title}</h1>
        <span className="likes">❤️ {article.favoritesCount}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="description">
          {article.description}
        </div>
        
        <div className="article-meta">
          <div className="author-info">
            <img src={article.author.image || 'https://via.placeholder.com/50'} alt={article.author.username} className="author-avatar" />
            <div>
              <p>{article.author.username}</p>
              <p className="article-date">{new Date(article.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {user && user.username === article.author.username && (
            <div className="article-actions">
              <button onClick={handleEdit} className="btn-edit">Edit</button>
              <button onClick={handleDelete} className="btn-delete">Delete</button>
            </div>
          )}
        </div>
      </div>

      <div className="tags">
        {article.tagList.map((tag, index) => (
          <span key={index} className="post-tag">{tag}</span>
        ))}
      </div>
      
      <div className="article-body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
};

// Define PropTypes
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
  }).isRequired,
};

export default Article;
