import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
    const { slug } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`https://api.realworld.io/api/articles/${slug}`);
                const data = await response.json();
                const article = data.article;
                setTitle(article.title);
                setDescription(article.description);
                setText(article.body);
            } catch (err) {
                setError('Failed to load article');
            }
        };

        fetchArticle();
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !text) {
            setError('All fields are mandatory');
            return;
        }

        const articleData = {
            title,
            description,
            body: text,
            tagList: [], // Optional: Handle tags if needed
        };

        try {
            const response = await fetch(`https://api.realworld.io/api/articles/${slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}` // Replace with actual token
                },
                body: JSON.stringify({ article: articleData }),
            });

            if (response.ok) {
                navigate(`/article/${slug}`);
            } else {
                const errorData = await response.json();
                setError(errorData.errors.body || 'Failed to update article');
            }
        } catch (err) {
            setError('An error occurred while updating the article');
        }
    };

    return (
        <div className="edit-article-page">
            <h1>Edit Article</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Short Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="text">Text:</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Article</button>
            </form>
        </div>
    );
};

export default EditArticle;
