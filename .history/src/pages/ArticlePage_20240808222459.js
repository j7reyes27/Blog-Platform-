import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loading from '../components/Loading'
import Article from '../components/Article'

const ArticlePage = () => {
    const {slug} = useParams();
    const[loading, setLoading] = useState(false)
    const[article, setArticle] = useState(null)
    const[error, setError] = useState(null)

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try{
                const response = await fetch(`https://api.realworld.io/api/articles/${slug}`)
                const data = await response.json();
                setArticle(data.article)
            } catch (err) {
                setError(err.message)
            }
            setLoading(false);
        };
        fetchArticle();
    }, [slug])

    return (
        <div>
            {loading && <Loading/>}
        </div>
    )
}; 

export default ArticlePage;
