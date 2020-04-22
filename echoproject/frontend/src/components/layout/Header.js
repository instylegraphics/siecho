import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <span>
                <li className="header-menu">
                  <span>Echo</span>
                </li>
      
                <li>
                <Link to="/">
                    <i className="fa fa-book"></i>
                    <span>Create Series & Matches</span>
                </Link>
                </li>
      
                <li>
                <Link to="/matches">
                    <i className="fa fa-gem"></i>
                    <span>Edit a Match</span>
                </Link>
                </li>
      
                <li>
                <Link to="/caster">
                    <i className="fa fa-folder"></i>
                    <span>Caster Live</span>
                </Link>
                </li>
                
                 <li className="header-menu">
                  <span>Account</span>
                </li>
                                 
                <li>
                    <a href="#" onClick={this.props.logout}>
                    <i className="fa fa-folder"></i>
                    <span>Logout</span>
                    </a>
                </li>
      </span>  
    );

    const guestLinks = (
      <span>
                <li className="header-menu">
                  <span>Account</span>
                </li>        
                <li>
                <Link to="/login">
                    <i className="fa fa-folder"></i>
                    <span>Login</span>
                </Link>
                </li>
      
                <li>
                <Link to="/Register">
                    <i className="fa fa-folder"></i>
                    <span>Register</span>
                </Link>
                </li>
      </span> 
    );

    return (
  <nav id="sidebar" className="sidebar-wrapper">
    <div className="sidebar-content">
      <div className="sidebar-brand">
        <a href="/">Welcome to SI Echo</a>
        <div id="close-sidebar">
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="sidebar-header">
        <div className="user-pic">
          <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt="User picture" />
        </div>
        <div className="user-info">
          <span className="user-name">
            <strong>{user ? `${user.username}` : "Anonymous"}</strong>
          </span>
          <span className="user-role">{user ? `${user.email}` : "You must login!"}</span>
          <span className="user-status">
            <i className="fa fa-circle"></i>
            <span>{user ? "Online" : "Offline"}</span>
          </span>
        </div>
      </div>
 
      <div className="sidebar-menu">
        <ul> 
        
        {isAuthenticated ? authLinks : guestLinks}
             
         <li className="header-menu">
            <span>Information</span>
          </li>
          <li className="sidebar-dropdown" >
            <a href="#">
              <i className="fa fa-tachometer-alt"></i>
              <span>About Us</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
              
                <li>
                  <a href="#" onClick={this.props.logout}>Documentation</a>
                </li>

                <li>
                  <a href="#" onClick={this.props.logout}>FAQ's</a>
                </li>

                <li>
                  <a href="#" onClick={this.props.logout}>Contact Us</a>
                </li>
              </ul>
            </div>
          </li>
                   
        </ul>
      </div>

    </div>

    <div className="sidebar-footer">
      <a href="#">
        <i className="fa fa-bell"></i>
      </a>
      <a href="#">
        <i className="fa fa-envelope"></i>
      </a>
      <a href="#">
        <i className="fa fa-cog"></i>
      </a>
      <a href="#">
        <i className="fa fa-power-off"></i>
      </a>
    </div>
  </nav>
      
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, { logout } )(Header);