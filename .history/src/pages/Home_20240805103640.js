import React, {useState, useEffect} from 'react';


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const fetchArticles = async (page) => {
    setLoading(true);
  try {
    const response = await fetch(`https://api.realworld.io/api/articles?limit=5&offset=`)
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
      <header className='header'>
        <h1>Realworld Booty</h1>
      <div>
       <button className='auth-buttons'>Sign in</button> 
       <button className='auth-buttons'>Sign up</button>
      </div>
      </header>
      <div className='post'>

      </div>
      <div className='pagination'></div>
    </div>
  )
};



export default Home;
