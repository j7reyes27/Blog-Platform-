import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Post from './components/Post'


const ArticleList = ({articles}) => {
  return(
    <div>
        {articles.map((article) => (
            <Post/>
        )
    </div>
  )
};

export default ArticleList;
