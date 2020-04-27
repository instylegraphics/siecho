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
                <Link to="/series">
                    <i className="fas fa-trophy"></i>
                    <span>Create Series</span>
                </Link>
                </li>
      
                <li>
                <Link to="/match">
                    <i className="fas fa-gamepad"></i>
                    <span>Edit a Match</span>
                </Link>
                </li>
      
                <li>
                <Link to="/livescene">
                    <i className="fas fa-headset"></i>
                    <span>Live Scene</span>
                </Link>
                </li>
                
                 <li className="header-menu">
                  <span>Account</span>
                </li>
                                 
                <li>
                    <a href="#" onClick={this.props.logout}>
                    <i className="fa fa-power-off"></i>
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
                    <i className="fa fa-power-off"></i>
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
        <a>Welcome to SI Echo</a>
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
            <strong>{user ? `${user.username}` : "Anonymous User"}</strong>
          </span>
          <span className="user-role">{user ? `${user.email}` : "You must login!"}</span>
          {user ?  
          <span className="user-status">
            <i className="fa fa-circle"></i>
            <span>Online</span>
          </span>
          : 
          <span className="user-status">
            <i className="fa fa-circle text-danger"></i>
            <span>Offline</span>
          </span>          
          }
          
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
              <i className="fas fa-dice"></i>
              <span>About Echo</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
              
                <li>
                  <a href="#">Tutorial</a>
                </li>

                <li>
                  <a href="#">Documentation</a>
                </li>

                <li>
                  <a href="#">FAQ's</a>
                </li>
              </ul>
            </div>
          </li>
          

          <li className="sidebar-dropdown" >
            <a href="#">
              <i className="fa fa-tachometer-alt"></i>
              <span>About SI</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
              
                <li>
                  <a href="#">SI Overview</a>
                </li>

                <li>
                  <a href="#">Team</a>
                </li>

                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </li>
          
                                       
        </ul>
      </div>

    </div>

    <div className="sidebar-footer">
      <a href="#">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#">
        <i className="fab fa-discord"></i>
      </a>
      <a href="#">
        <i className="fab fa-twitch"></i>
      </a>
      {user ? 
      <a href="#" alt="Logout" onClick={this.props.logout}>
        <i className="fa fa-power-off"></i>
      </a>
      :
      <Link to="/login">
          <i className="fa fa-power-off"></i>
      </Link>
      }        
                
    </div>
  </nav>
      
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, { logout } )(Header);