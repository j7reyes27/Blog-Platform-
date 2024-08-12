import ReactMarkdown from 'react-markdown';

const Article = ({article}) => {
    return(
        <div className='article-conatiner'>
            <div>{article.title} <span className='likes'>{article.favoritesCount}</span> </div>
            <div className='tags'>
                {article.tagList.map((tag, index) => (
                    <span key={index} className='post-tag'>{tag}</span>
                ))}
            </div>
            <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
    )
};

export default Article;
