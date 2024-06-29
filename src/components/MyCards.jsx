import React, { useState, useEffect } from 'react';
import { fetchCards } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './MyCards.css';

const MyCards = () => {
  const { user, addFavoriteCard, updateFavoriteCard, removeFavoriteCard } = useAuth();
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ title: '', description: '' });
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      try {
        const fetchedCards = await fetchCards();
        setCards(fetchedCards);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch cards');
        setLoading(false);
      }
    };

    if (user && user.isBusinessUser) {
      loadCards();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAddCard = () => {
    const newId = cards.length ? cards[cards.length - 1].id + 1 : 1;
    const cardToAdd = { ...newCard, id: newId };
    addFavoriteCard(cardToAdd);
    setNewCard({ title: '', description: '' });
  };

  const handleUpdateCard = () => {
    updateFavoriteCard(editingCard);
    setEditingCard(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.isBusinessUser) {
    return <div>You must be a business user to view this page.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="my-cards-container">
      <h1>My Business Cards</h1>
      <div className="card-form">
        <input
          type="text"
          placeholder="Title"
          value={editingCard ? editingCard.title : newCard.title}
          onChange={(e) =>
            editingCard
              ? setEditingCard({ ...editingCard, title: e.target.value })
              : setNewCard({ ...newCard, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={editingCard ? editingCard.description : newCard.description}
          onChange={(e) =>
            editingCard
              ? setEditingCard({ ...editingCard, description: e.target.value })
              : setNewCard({ ...newCard, description: e.target.value })
          }
        />
        {editingCard ? (
          <button onClick={handleUpdateCard}>Update Card</button>
        ) : (
          <button onClick={handleAddCard}>Add Card</button>
        )}
      </div>
      <ul className="cards-list">
        {cards.map(card => (
          <li key={card.id} className="card-item">
            <div className="card-content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <button onClick={() => setEditingCard(card)}>Edit</button>
              <button onClick={() => removeFavoriteCard(card.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCards;
