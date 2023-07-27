/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useEffect } from 'react';
import './index.css';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import MSysLogo from '../../assets/images/msysLogo.png';
import headers from './headers.json';
import noImage from '../../assets/images/noProfilePic.png'

/**
 * Header With Searchbar
 *
 * @description: Shows a header component with a search bar to input a github username
 * @returns Header Component
 */
function Header({ page }) {
  const [currentUserData, setCurrentUserData] = useState({});
  const [currentUsername, setCurrentUsername] = useState('');

  const navigate = useNavigate();
  const navigateTo = (path) => {
    if (path === 'signin') {
      UserService.doLogin();
    } else if (page === 'logout') {
      UserService.doLogout();
    } else {
      localStorage.setItem('position', 'header');
      navigate('../' + path);
    }
  };

  const getCurrentUsers = async (username) => {
    const responseProfileData = await fetch(
      `${process.env.REACT_APP_serverURL}/user/${username}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    // eslint-disable-next-line no-unused-vars
    const profileData = await responseProfileData.json();
    setCurrentUserData(profileData);
  };

  useEffect(() => {
    if (currentUsername) {
      getCurrentUsers(currentUsername);
    }
  }, [currentUsername])

  useEffect(() => {
    const username = UserService.getUsername();
    if (username !== currentUsername) {
      setCurrentUsername(username);
    }
  }, []);
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <img
            alt="logo"
            className="img-logo"
            onClick={() => navigateTo('/')}
            src={MSysLogo}
            style={{ height: 50, width: 200, cursor: 'pointer' }}
          />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
            <ul className="navbar-nav">

              {headers.map(
                (header) =>
                  header.page === page &&
              header.menu.map((menu) => {
                return (
                  // eslint-disable-next-line no-undef
                  (process.env.REACT_APP_isKeycloak === menu.keyCloak ||
                    menu.keyCloak === null) && (
                    <li key={menu.key} className="nav-item" onClick={() => navigateTo(menu.key)}>
                      <a className="nav-link active" style={{cursor:'pointer'}} aria-current="page" >{menu.displayName}</a>
                    </li>
                    // <a
                    //   key={index}
                    //   className="action-link"
                    //   onClick={() => navigateTo(menu.key)}
                    // >
                    //   {menu.displayName}{" "}
                    // </a>
                  )
                );
              })
              )}
        
            </ul>
            {page!='welcome' && page!='signup' &&  (<>

              <div className="dropdown pb-1" style={{marginRight: '10px',marginLeft: '10px'}}>
                <a href="#" className="d-flex  text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  {
                    currentUserData?.profilePic ? 
                      <img alt="hugenerd" width="30" height="30" className="rounded-circle" src={userData?.profilePic} /> 
                      : 
                      <img alt="hugenerd" width="30" height="30" className="rounded-circle" src={noImage} />
                  }
                  <span className="d-none d-sm-inline mx-1 header--username">{currentUserData?.username}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  {/* <li><a className="dropdown-item" href="#">New </a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li> */}
                  <li onClick={()=>window.location.replace('http://3.232.225.73:8080/realms/SpringBootKeycloak/protocol/openid-connect/logout')} ><a href=""  className="dropdown-item" target="_blank" rel="noopener noreferrer">Sign out</a></li>
                </ul>
              </div>
            </>)
            }
     
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
