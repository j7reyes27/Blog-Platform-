import React, {useState} from 'react';
import Post from './Post'


const ArticleList = ({articles}) => {
  return(
    <div>
        {articles.map((article) => (
            <Post key={article.slug} article={article}/>
        ))}
    </div>
  )
};

export default ArticleList;
