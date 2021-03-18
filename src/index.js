import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Category from './pages/Category';
import CreateHowl from './pages/CreateHowl';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import About from './pages/About';
import Community from './pages/Community';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/landing.scss';

const routing = (
  <Router>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/category/:id" component={Category} />
    <Route exact path="/profile/:clipId" component={Profile} />
    <Route exact path="/create" component={CreateHowl} />
    <Route exact path="/shop" component={Shop} />
    <Route exact path="/about" component={About} />
    <Route exact path="/community" component={Community} />
    <Route exact path="/terms-of-use" component={Terms} />
    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);