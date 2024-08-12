import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';

const Article = ({ article }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://api.realworld.io/api/articles/${article.slug}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });

                if (response.ok) {
                    navigate('/');
                } else {
                    alert('Failed to delete article');
                }
            } catch (err) {
                alert('An error occurred while deleting the article');
            }
        }
    };

    return (
        <div className="article-container">
            <div>
                {article.title} <span className="likes">{article.favoritesCount}</span>
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
                    <Link to={`/articles/${article.slug}/edit`} className="btn btn-secondary">Edit</Link>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            )}
        </div>
    );
};

export default Article;
