import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CompanyName from '../images/mlhuillier_heading_white.png';

export default class NavHome extends Component {
  render() {
    const userdetails = JSON.parse(localStorage.getItem('userdetails'))
    const { fullname } = userdetails[0]
    return (

      <nav className="navbar navbar-expand-md navbar-dark sticky-top py-0" style={{ color: 'white', backgroundColor: '#E0051A', fontSize: 14 }}>

        <div style={{ margin: '3px 15px' }}>
          <img src={CompanyName} height="40" alt="BOS Web" />
        </div>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/customer" className="nav-link border-0" >
                <i className="fas fa-coins" ></i> Quick Cash Loan
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/report" className="nav-link border-0" style={{ color: "white", fontSize: "14px" }}>
                <i className="fas fa-clipboard-list" style={{ fontSize: "14px" }}></i> Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="nav-link border-0" style={{ color: "white", fontSize: "14px" }}>
                <i className="fas fa-cog" style={{ fontSize: "14px" }}></i> Settings
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><i className="fas fa-user-circle"></i>&nbsp;{fullname}</li>
          </ul>

          <Link to="/" className="nav-link border-0" style={{ color: "white", fontSize: 14 }}>
            <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
          </Link>
        </div>
      </nav>
    );
  }
}