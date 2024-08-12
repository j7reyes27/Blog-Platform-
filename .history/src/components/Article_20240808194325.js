import ReactMarkdown from 'react-markdown';

const Article = ({article}) => {
    return(
        <div>
            <h1>{article.title}</h1>
            <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
    )
};

export default Article;
