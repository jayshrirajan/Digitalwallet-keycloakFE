/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import './index.css'
import { usePlaidLink } from 'react-plaid-link';
import { linkToken } from '../../services/ApiService';
import uuid from 'react-uuid';
import Header from '../Header';
import SideBar from '../SideBar';
import AddMoneyToWallet from '../AddMoneyToWallet';

function App(props) {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [displayResponse, setDisplayResponse] = useState({});

  const createWalletUser = () => {
    // eslint-disable-next-line no-undef
    const response = fetch(`${process.env.REACT_APP_serverURL}/wallet/account`, {
      headers: {
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'user-id': uuid() //'987b17f3-bc1c-4223-8075-dd3f8e8fba2a'
      },
      method: 'POST',
    })
    setDisplayResponse({})
    response.then(res => res.json()).then(data => {
      setDisplayResponse(data)
    })
  }

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes('?oauth_state_id=')) {
      const linkToken = localStorage.getItem('link_token');
      setToken(linkToken);
    } else {
      linkToken().then(response => {
        localStorage.setItem('link_token', response.result.data.linkToken);
        setToken(response.result.data.linkToken);

      })
        .catch(err => { })
    }
  }, [setToken]);

  // Fetch balance data
  const getBalance = React.useCallback(async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_serverURL}/plaid-service/account-details`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ accessToken: localStorage.getItem('accessToken') }),
    });
    const data = await response.json();
    setData(data);
    const responseLinkAccount = await fetch(`${process.env.REACT_APP_serverURL}/link-bank-account`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        'bankName': 'SampleBankName',
        'userId': '642eca73e504cb20a953eba6',
        'bankRoutingNumber': 'CITI2041',
        'bankAccountId': 'accountID'

      }),
    });

    const datalinkaccount = await responseLinkAccount.json();

    setLoading(false);
  }, [setData, setLoading]);

  const onSuccess = useCallback(async (publicToken) => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_serverURL}/plaid-service/access-token`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ publicToken: publicToken }),
    });
    var data = await response.json();
    localStorage.setItem('accessToken', data.result.data.accessToken);
    await getBalance();
  }, [getBalance]);

  let isOauth = false;

  const config = {
    token,
    onSuccess,
  };

  // For OAuth, configure the received redirect URI
  if (window.location.href.includes('?oauth_state_id=')) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }
  }, [token, isOauth, ready, open, createLinkToken]);

  return (
    <>

      <Header page={'dashboard'}></Header>
      <div className="container-fluid content-area">
        <div className="row flex-nowrap">
          <SideBar />
          <div className="col py-3 px-5">
            <AddMoneyToWallet />
          </div>
        </div>
      </div>
      
    </>
   
  );
}

export default App;