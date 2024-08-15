import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './NewArticle.css';

const EditArticle = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`https://api.realworld.io/api/articles/${slug}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const article = response.data.article;
        setTitle(article.title);
        setDescription(article.description);
        setBody(article.body);
        setTags(article.tagList);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleTagAdd = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagDelete = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.put(
            `https://api.realworld.io/api/articles/${slug}`,
            {
                article: {
                    title,
                    description,
                    body,
                    tagList: tags,
                },
            },
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );

        console.log('Article updated successfully:', response.data.article);
        navigate(`/article/${response.data.article.slug}`);  // Corrected navigation
    } catch (error) {
        console.error('Error updating article:', error);
    }
};


  return (
    <div className="new-article-container">
      <h2>Edit article</h2>
      <form onSubmit={handleSubmit} className="new-article-form">
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Short description</label>
        <input
          type="text"
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Text</label>
        <textarea
          placeholder="Text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <label>Tags</label>
        <div className="tags-input">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              <span>{tag}</span>
              <button type="button" onClick={() => handleTagDelete(index)}>
                Delete
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder="Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button type="button" onClick={handleTagAdd}>
            Add tag
          </button>
        </div>

        <button type="submit" className="btn-submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
