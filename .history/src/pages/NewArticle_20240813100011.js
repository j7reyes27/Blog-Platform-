import React, { useState } from 'react';
import axios from 'axios';
import './NewArticle.css';

const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

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
      // Redirect or clear form after success, as needed.
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
          Send
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
