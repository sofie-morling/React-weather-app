import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Forecast from './components/Forecast';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>


      <div>
        <nav>
          <li><Link to="/">Todays Weather</Link></li>
          <li><Link to="/forecast">Forecast 5 days</Link></li>
        </nav>
      </div>

      <Switch>
        <Route path="/forecast">
          <Forecast />
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
