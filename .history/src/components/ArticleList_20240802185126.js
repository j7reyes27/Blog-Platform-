import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const ArticleList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  

const fetchPosts = async (page) => {
  
};

export default ArticleList;
