import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({ article }) => {
    return (
        <div className='post'>
            <div className='post-header'>
                <div className="post-title-container">
                    <Link to={`/article/${article.slug}`} className="post-title-link">
                        <h2 className="post-title">{article.title}</h2>
                    </Link>
                    <div className='post-likes'>
                        <span className='like-icon'>&#10084;</span>
                        <span className='like-count'>{article.favoritesCount}</span>
                    </div>
                </div>
                <div className='post-meta'>
                    <img src={article.author.image} alt={article.author.username} className='author-image' />
                    <div className='author-info'>
                        <span className='post-author'>{article.author.username}</span>
                        <span className='post-date'>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <p className='post-description'>{article.description}</p>
            <div className="post-tags">
                {article.tagList.map((tag, index) => (
                    <span key={index} className="post-tag">{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default Post;
