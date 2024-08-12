import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewArticle = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            const response = await fetch('https://api.realworld.io/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}` // Replace with actual token
                },
                body: JSON.stringify({ article: articleData }),
            });

            if (response.ok) {
                const data = await response.json();
                navigate(`/article/${data.article.slug}`);
            } else {
                const errorData = await response.json();
                setError(errorData.errors.body || 'Failed to create article');
            }
        } catch (err) {
            setError('An error occurred while creating the article');
        }
    };

    return (
        <div className="new-article-page">
            <h1>Create New Article</h1>
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
                <button type="submit">Create Article</button>
            </form>
        </div>
    );
};

export default NewArticle;
