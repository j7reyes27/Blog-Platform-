import { Link } from 'react-router-dom'
import './Post.css'

const Post = ({article}) => {
    return(
        <div className='post'>
            <div className='post-header'>
                <div className="post-title-container">
                    <Link to={`/article/${article.slug}`} className='post-title-link'>
                    <h2 className="post-title">{article.title}</h2>
                    </Link>
                    <span className='post-likes'> {article.favoritesCount} </span>
                </div>
                <div className='post-meta'>
                    <span className='post-author'>{article.author.username}</span>
                    <span className='post-date'>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}


export default Post; 