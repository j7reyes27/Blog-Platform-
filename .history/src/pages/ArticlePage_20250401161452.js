import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Loading from '../components/Loading';
import Article from '../components/Article';

const ArticlePage = () => {
    const { slug } = useParams();
    const navigate = useNavigate(); // Initialize navigate here
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/articles/${slug}`);
                setArticle(response.data.article);
            } catch (err) {
                setError(err.message);
                navigate('/'); // Now properly defined
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug, navigate]); // Add navigate to dependency array

    if (loading) return <Loading />;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div className="article-page-container">
            <Article article={article} />
        </div>
    );
};

export default ArticlePage;