import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import MyCards from './components/MyCards';
import Login from './components/Login';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Favorite from './components/Favorite';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { isDarkMode } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/my-cards" component={MyCards} />
          <Route path="/login" component={Login} />
          <Route path="/favorites" component={Favorite} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


