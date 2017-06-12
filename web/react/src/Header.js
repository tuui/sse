import React from "react";
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
                <div className="container">
                    <ul className="nav navbar-nav">
                        <li className="nav-item"><NavLink to="/history" className="nav-link" activeClassName="nav-link active">History</NavLink></li>
                        <li className="nav-item"><NavLink to="/live" className="nav-link" activeClassName="nav-link active">Live</NavLink></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;