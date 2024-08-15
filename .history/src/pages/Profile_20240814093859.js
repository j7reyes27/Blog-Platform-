import { useState, useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            fetchAllArticles(storedUser.username);
        }
    }, []);

    const fetchAllArticles = async (username) => {
        let allArticles = [];
        let limit = 20;  // Number of articles to fetch per request
        let offset = 0;  // Start at the beginning
        let hasMore = true;

        try {
            while (hasMore) {
                const response = await fetch(
                    `https://api.realworld.io/api/articles?author=${username}&limit=${limit}&offset=${offset}`
                );
                const data = await response.json();
                if (data.articles.length > 0) {
                    allArticles = [...allArticles, ...data.articles];
                    offset += limit;
                } else {
                    hasMore = false; // No more articles to fetch
                }
            }
            setArticles(allArticles);
        } catch (err) {
            console.error('Failed to fetch articles:', err);
            setError('Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="profile-container">
            <h2>Your Articles</h2>
            {articles.length > 0 ? (
                <ul>
                    {articles.map((article) => (
                        <li key={article.slug}>
                            <a href={`/article/${article.slug}`}>{article.title}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
};

export default Profile;
