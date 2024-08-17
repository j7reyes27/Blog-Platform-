import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Post from './Post';

const ArticleList = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
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
      description: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      favorited: PropTypes.bool.isRequired,
      favoritesCount: PropTypes.number.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
        bio: PropTypes.string,
        image: PropTypes.string,
        following: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

export default ArticleList;
