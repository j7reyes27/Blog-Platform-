import ReactMarkdown from 'react-markdown';

const Article = ({article}) => {
    return(
        <div className='article-conatiner'>
            <div>{article.title}</div>
            <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
    )
};

export default Article;
