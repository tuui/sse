import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <header>
        <ul>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/live">Live</Link></li>
      </ul>
      </header>
    );
  }
}

export default Header;