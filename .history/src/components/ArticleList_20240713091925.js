import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const ArticleList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  

const fetchPosts = async (page) => {
  setLoading(true);
  try {
  const response = await fetch(`https://api.realworld.io/api/articles?limit=10&offset=${(page - 1) * 10}`)
  if(!response.ok) {
    throw new Error('Network response is no bueno')
  }

  const data = await response.json();
  setPosts(data.articles);
  setTotalPages(Math.ceil(data.articlesCount / 10))
  setLoading(false);
  } catch(error) {
    setError('Error fetching data')
    setLoading(false);
  }
};

  





  return (

  );
};

export default ArticleList;
