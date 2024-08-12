import React, {useState, useEffect} from 'react';
import ArticleList from '../components/ArticleList'


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const fetchArticles = async (page) => {
    setLoading(true);
  try {
    const response = await fetch('https://api.realworld.io/api')
    const data = await response.json();
    setArticles(data.articles)
    setTotalPages(Math.ceil(data.articles / 5))
    setCurrentPage(page)
  } catch (err) {
    setError(err.message)
  } 
  setLoading(false)
};

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage])

  return (
    <div>
    <ArticleList articles={articles}/>
    </div>
  )
};



export default Home;
