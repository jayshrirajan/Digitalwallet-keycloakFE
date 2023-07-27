import './index.css';
import React, { useEffect } from 'react';
import MSysLogo from '../../assets/images/wallet5.png';
import Header from '../Header';

function WelcomeScreen() {
  useEffect(() => {
  }, []);
  return (
    <><Header page={'welcome'}></Header>
      <div className="welcome-container">
        <div className="left-container">
          <h1>Digital wallet</h1>
          <ul>
            <li> More Convenience</li>
            <li> Easy Payment</li>
            <li> More Secure</li>
          </ul>
        </div>
        <div className="right-container">
          <div style={{ display: 'flex',
            alignItems: 'center', height:'90%'}}>
            <img alt="logo" className="img-logo" src={MSysLogo} />
          </div>
        </div>
      </div>
    </>
  );
}
export default WelcomeScreen;
