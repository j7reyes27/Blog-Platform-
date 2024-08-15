import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewArticle.css';

const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleTagAdd = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagDelete = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Short description is required';
    if (!body) newErrors.body = 'Text is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        'https://api.realworld.io/api/articles',
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

      console.log('Article created successfully:', response.data.article);
      navigate(`/profile/${user.username}`);
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div className="new-article-container">
      <h2>Create new article</h2>
      <form onSubmit={handleSubmit} className="new-article-form">
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <label>Short description</label>
        <input
          type="text"
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <label>Text</label>
        <textarea
          placeholder="Text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {errors.body && <p className="error">{errors.body}</p>}

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
          Send
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
