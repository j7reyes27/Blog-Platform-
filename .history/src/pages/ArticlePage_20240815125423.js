import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Article from '../components/Article';

const ArticlePage = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in user

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.realworld.io/api/articles/${slug}`);
                const data = await response.json();
                setArticle(data.article);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };
        fetchArticle();
    }, [slug]);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (window.confirm("Are you sure you want to delete this article?")) {
            try {
                await fetch(`https://api.realworld.io/api/articles/${slug}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                navigate(`/profile/${user.username}`); // Redirect to the user's profile after deletion
            } catch (err) {
                setError('Failed to delete the article');
            }
        }
    };

    return (
        <div>
            {loading && <Loading />}
            {error && <div>Error: {error}</div>}
            {article && (
                <div>
                    <Article article={article} />
                    {user && user.username === article.author.username && (
                        <div className="article-actions">
                            <button onClick={() => navigate(`/edit-article/${slug}`)} className="btn-edit">
                                Edit
                            </button>
                            <button onClick={handleDelete} className="btn-delete">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ArticlePage;
