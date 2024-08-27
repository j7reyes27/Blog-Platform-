import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const ArticleList = ({ articles }) => {
  if(!Array.isArray(articles)) {
    return <div>No articles available</div></>
  }
  return (
    <div>
      {articles.map((article = [] ) => (
        <Post key={article.slug} article={article} />
      ))}
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
      favoritesCount: PropTypes.number.isRequired,
      tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired,
      favorited: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default ArticleList;
