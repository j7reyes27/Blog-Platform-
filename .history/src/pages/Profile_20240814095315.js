import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchAllArticles = async () => {
    let allArticles = [];
    let limit = 20;  // Number of articles to fetch per request
    let offset = 0;  // Start at the beginning
    let hasMore = true;

    try {
        while (hasMore) {
            const response = await axios.get('https://api.realworld.io/api/articles', {
                params: {
                    limit: limit,
                    offset: offset,
                }
            });
            const articles = response.data.articles;

            if (articles.length > 0) {
                allArticles = [...allArticles, ...articles];
                offset += limit;
            } else {
                hasMore = false; // No more articles to fetch
            }
        }
        return allArticles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};

// Usage in a React component
const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            const allArticles = await fetchAllArticles();
            setArticles(allArticles);
            setLoading(false);
        };
        loadArticles();
    }, []);

    if (loading) return <div>Loading articles...</div>;

    return (
        <div>
            <h2>All Articles</h2>
            <ul>
                {articles.map(article => (
                    <li key={article.slug}>
                        <a href={`/article/${article.slug}`}>{article.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticlesList;
