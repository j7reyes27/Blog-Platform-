import React from 'react';
import {useState, useEffect} from 'react'
// Update imports at the top
import { useParams, useNavigate, navigate } from 'react-router-dom';
import api from '../api';
import Loading from '../components/Loading'
import Article from '../components/Article'

const ArticlePage = () => {
    const {slug} = useParams();
    const[loading, setLoading] = useState(false)
    const[article, setArticle] = useState(null)
    const[error, setError] = useState(null)

    useEffect(() => {
        // Update the fetchArticle function
        const fetchArticle = async () => {
            setLoading(true);
            try {
            const response = await api.get(`/articles/${slug}`);
            setArticle(response.data.article);
            } catch (err) {
            setError(err.message);
            navigate('/');
            } finally {
            setLoading(false);
            }
        };
        fetchArticle();
    }, [slug])

    return (
        <div>
            {loading && <Loading/>}
            {error && <div>Error: {error}</div>}
            {article && <Article article={article}/>}
        </div>
    )
}; 

export default ArticlePage;
