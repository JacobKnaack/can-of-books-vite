import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import Welcome from './Welcome';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={this.props.auth0.isAuthenticated ? <BestBooks /> : <Welcome />}
            />
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
            <Route 
              exact path="/about"
              element={<About />}
            />
            <Route
              exact path="/profile"
              element={<Profile />}
            />
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

const AuthApp = withAuth0(App);

export default AuthApp;
