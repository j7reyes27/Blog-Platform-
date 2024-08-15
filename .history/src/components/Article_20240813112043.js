import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';
import './Article.css'

const Article = ({ article }) => {
  const navigate = useNavigate(); // Updated hook usage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`https://api.realworld.io/api/articles/${article.slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      navigate('/'); // Updated navigation
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-article/${article.slug}`); // Updated navigation
  };

  return (
    <div className="article-container">
      <div className="article-header">
        <h1>{article.title}</h1>
        <span className="likes">❤️ {article.favoritesCount}</span>
      </div>
      <div className="tags">
        {article.tagList.map((tag, index) => (
          <span key={index} className="post-tag">{tag}</span>
        ))}
      </div>
      <div className="description">
        {article.description}
      </div>
      <ReactMarkdown>{article.body}</ReactMarkdown>
      
      {user && user.username === article.author.username && (
        <div className="article-actions">
          <button onClick={handleEdit} className="btn-edit">Edit</button>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Article;
