import React, { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchArticles = async (page) => {
    setLoading(true);
    setError(null);  // Reset error before fetching
    try {
      const response = await fetch(`https://api.realworld.io/api/articles?limit=5&offset=${(page - 1) * 5}`);
      const data = await response.json();
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.articlesCount / 5));
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      fetchArticles(page);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading-message">Loading articles, please wait...</div>
      ) : (
        <>
          <ArticleList articles={articles} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
