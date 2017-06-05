import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header';
import Live from './Live';
import History from './History';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/history" component={History}/>
          <Route path="/live" component={Live}/>
        </div>
      </Router>
    );
  }
}

export default App;
