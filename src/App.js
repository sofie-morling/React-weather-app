import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Forecast from './components/Forecast';
import About from './components/About';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      
          <div>
            <nav>
              <ul>
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="/forecast">Forecast 5 days</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
          </div>

          <Switch>
            <Route path="/forecast">
              <Forecast />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
     
    </Router>
  );
}

export default App;
