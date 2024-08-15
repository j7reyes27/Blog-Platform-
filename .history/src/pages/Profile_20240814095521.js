import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchUserArticles = async (username) => {
    let userArticles = [];
    let limit = 20;  // Number of articles to fetch per request
    let offset = 0;  // Start at the beginning
    let hasMore = true;

    try {
        while (hasMore) {
            const response = await axios.get('https://api.realworld.io/api/articles', {
                params: {
                    author: username, // Filter by author
                    limit: limit,
                    offset: offset,
                }
            });
            const articles = response.data.articles;

            if (articles.length > 0) {
                userArticles = [...userArticles, ...articles];
                offset += limit;
            } else {
                hasMore = false; // No more articles to fetch
            }
        }
        return userArticles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};

// Usage in a React component
const UserArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage

    useEffect(() => {
        const loadUserArticles = async () => {
            if (user && user.username) {
                const userArticles = await fetchUserArticles(user.username);
                setArticles(userArticles);
                setLoading(false);
            }
        };
        loadUserArticles();
    }, [user]);

    if (loading) return <div>Loading your articles...</div>;

    return (
        <div>
            <h2>Your Articles</h2>
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

export default UserArticlesList;
