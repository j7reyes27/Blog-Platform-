import React, {useState, useEffect} from 'react';
import ArticleList from '../components/ArticleList'
import Pagination from '../components/Pagination'


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const fetchArticles = async (page) => {
    setLoading(true);
  try {
    const response = await fetch(`https://api.realworld.io/api/articles?limit=5&offset=${(page - 1) * 5}`)
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
    <Pagination 
    currentPage={currentPage} 
    totalPages={totalPages}
    onPageChange={currentPage}/>
    </div>
  )
};



export default Home;
