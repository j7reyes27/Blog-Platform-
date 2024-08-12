import React, {useState} from 'react';
import Post from './Post'


const ArticleList = ({articles}) => {
  return(
    <div>
        {articles.map((article) => (
            <Post/>
        ))}
    </div>
  )
};

export default ArticleList;
