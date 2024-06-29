// src/components/ContentDisplay.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentDisplay = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get('/api/content')
      .then(response => setContent(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Content</h1>
      <ul>
        {content.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContentDisplay;
