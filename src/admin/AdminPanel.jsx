
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [content, setContent] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    axios.get('/api/content')
      .then(response => setContent(response.data))
      .catch(error => console.error(error));
  }, []);

  const addContent = () => {
    axios.post('/api/content', { title: newTitle })
      .then(response => setContent([...content, response.data]))
      .catch(error => console.error(error));
  };

  const deleteContent = (id) => {
    axios.delete(`/api/content/${id}`)
      .then(() => setContent(content.filter(item => item.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New Content Title"
      />
      <button onClick={addContent}>Add</button>
      <ul>
        {content.map(item => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => deleteContent(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
