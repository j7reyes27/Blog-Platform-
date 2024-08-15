import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Article = () => {
    const { slug } = useParams();  // Assuming you're passing the slug as a URL parameter
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`https://api.realworld.io/api/articles/${slug}`);
                const data = await response.json();
                setArticle(data.article);
            } catch (err) {
                setError('Failed to fetch article');
                console.error('Error fetching article:', err);
            }
            setLoading(false);
        };
        fetchArticle();
    }, [slug]);

    if (loading) return <div>Loading article...</div>;
    if (error) return <div>{error}</div>;
    if (!article) return <div>No article found.</div>;

    return (
        <div className="article-container">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <div>
                <strong>Author: </strong> {article.author.username}
            </div>
            <div>
                <strong>Body: </strong> {article.body}
            </div>
            <div>
                <strong>Tags: </strong> {article.tagList.join(', ')}
            </div>
        </div>
    );
};

export default Article;
