import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // User object to include user details
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const addFavoriteCard = (card) => {
    setFavoriteCards([...favoriteCards, card]);
  };

  const updateFavoriteCard = (updatedCard) => {
    setFavoriteCards(favoriteCards.map(card => (card.id === updatedCard.id ? updatedCard : card)));
  };

  const removeFavoriteCard = (cardId) => {
    setFavoriteCards(favoriteCards.filter(card => card.id !== cardId));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    // Persist favorite cards in local storage or API
    const savedFavorites = localStorage.getItem('favoriteCards');
    if (savedFavorites) {
      setFavoriteCards(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards));
  }, [favoriteCards]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      favoriteCards,
      addFavoriteCard,
      updateFavoriteCard,
      removeFavoriteCard,
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext };
