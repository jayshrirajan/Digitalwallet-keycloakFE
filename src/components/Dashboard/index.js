/* eslint-disable no-undef */
import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import { usePlaidLink } from 'react-plaid-link';
import { linkToken } from '../../services/ApiService';
import Header from '../Header';

import SideBar from '../SideBar';
import ProfileDetails from '../ProfileDetails';
import axios from 'axios';
import Loader from '../Loader';
import UserService from '../../services/UserService';
import { CloseCircleFilled } from '@ant-design/icons';

function App() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState({});
  const [currentUserWalletData, setCurrentUserWalletData] = useState({});
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentUserBankname, setCurrentUserBankname] = useState('');
  const [currentUserBankId, setCurrentUserBankId] = useState('');
  const [currentUserSortingCode, setCurrentUserSortingCode] = useState('');
  const [accountLoader, setAccountLoader] = useState(true);
  const [clickedBankAccount, setClickedBankAccount] = useState({
    bankName: '',
    accountNo: ''
  });

  // const [currentUserBankDet, setCurrentUserBankDet] = useState({});

  //const [displayResponse, setDisplayResponse] = useState('');
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true);

  // const createWalletUser = () => {
  //   const response = fetch(
  //     `${process.env.REACT_APP_serverURL}/wallet/account`,
  //     {
  //       headers: {
  //         accept: 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'user-id': uuid(), //'987b17f3-bc1c-4223-8075-dd3f8e8fba2a'
  //       },
  //       method: 'POST',
  //     }
  //   );

  //   response
  //     .then((res) => res.json())
  //     .then((data) => setDisplayResponse(JSON.stringify(data)));
  // };

  const onSuccess = useCallback(async (publicToken) => {
    setLoading(true);
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_serverURL}/plaid-service/access-token`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ publicToken: publicToken }),
      }
    );
    var data = await response.json();
    localStorage.setItem('accessToken', data.result.data.accessToken);
    setLoading(false);
  }, []);

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes('?oauth_state_id=')) {
      const linkToken = localStorage.getItem('link_token');
      setToken(linkToken);
    } else {
      linkToken()
        .then((response) => {
          localStorage.setItem('link_token', response.result.data.linkToken);
          setToken(response.result.data.linkToken);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {});
    }
  }, [setToken]);

  const deLinkAccount = (accountId) => {
    setLoading(true);
    axios
      .delete(
        `${process.env.REACT_APP_serverURL}/digital-wallet/accountId/${accountId}`
      )
      .then(() => {
        getUsersAccountdetails(currentUserData?.userId);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const linkAccount = async (bankName, bankAccountId, sortingCode) => {
    setLoading(true);
    const responseLinkAccount = await fetch(
      `${process.env.REACT_APP_serverURL}/plaid-service/link-bank-account`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          bankName,
          userId: currentUserData?.userId,
          bankRoutingNumber: sortingCode,
          bankAccountId,
        }),
      }
    );

    // eslint-disable-next-line no-unused-vars
    const datalinkaccount = await responseLinkAccount.json();
    getUsersAccountdetails(currentUserData?.userId);
    setCurrentUserBankname('');
    setCurrentUserBankId('')
    setCurrentUserSortingCode('')
    setLoading(false);
  };

  // Fetch balance data
  const getBalance = React.useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_serverURL}/plaid-service/account-details`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          accessToken: localStorage.getItem('accessToken'),
        }),
      }
    );
    const data = await response.json();
    setCurrentUserBankDet(data?.result?.data?.accounts);
  }, [setLoading]);

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
  // eslint-disable-next-line no-unused-vars
  const sideBarCollapse = async () => setSideBarCollapsed(!sideBarCollapsed);
  useEffect(() => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }
  }, [token, isOauth, ready, open, createLinkToken]);

  const getCurrentUsers = async (username) => {
    setLoading(true);
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

  const getCurrentUsersWallet = async (userId) => {
    setLoading(true);
    const responseWalletData = await fetch(
      `${process.env.REACT_APP_serverURL}/wallet/account`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'user-id': userId,
        },
      }
    );

    // eslint-disable-next-line no-unused-vars
    const walletData = await responseWalletData.json();
    setCurrentUserWalletData(walletData);
    setLoading(false);
  };

  useEffect(() => {
    if (currentUserData?.userId) {
      getCurrentUsersWallet(currentUserData?.userId);
      getUsersAccountdetails(currentUserData?.userId);
      getBalance(currentUserData?.userId);
    }
  }, [currentUserData]);

  useEffect(() => {
    if (currentUsername) {
      getCurrentUsers(currentUsername);
    }
  }, [currentUsername]);

  useEffect(() => {
    const username = UserService.getUsername();
    if (username !== currentUsername) {
      setCurrentUsername(username);
    }
  }, []);

  const getUsersAccountdetails = async (userId) => {
    setAccountLoader(true);
    const responseLinkAccount = await fetch(
      `${process.env.REACT_APP_serverURL}/digital-wallet/userId/${userId}`,
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
    const datalinkaccount1 = await responseLinkAccount.json();
    setData(datalinkaccount1?.result?.data);
    setAccountLoader(false);
  };
  return (
    <>
      <Header page={'dashboard'}></Header>
      <div className="container-fluid content-area">
        <div className="row flex-nowrap">
          <SideBar />
          {loading ? (
            <div className="loader-container-dashboard">
              <Loader />
            </div>
          ) : (
            <div className="col py-3 px-5">
              <ProfileDetails
                currentUserData={currentUserData}
                currentUserWalletData={currentUserWalletData}
              />
              <section>
                <div className="linked-account--header">
                  <div className="linked-bank-title">Linked Bank Accounts</div>

                  {/* <button
                    type="button"
                    onClick={linkAccountOnclickHandler}
                    disabled={!ready}
                    className="btn btn-secondary link-account--button"
                  >
                    Link Account
                  </button> */}
                  <button
                    type="button"
                    className="btn btn-success link-account--button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Link Account
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Bank Details
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="bankName"
                                className="form-label lable-align"
                              >
                                Bank Name
                              </label>
                              <input
                                type="text"
                                name="bandName"
                                value={currentUserBankname || ''}
                                onChange={(e) =>
                                  setCurrentUserBankname(e.target.value)
                                }
                                placeholder="Enter Bank Name"
                                className="form-control"
                                id="bankName"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <div className="row">
                                <div className="col-sm-12 col-md-6">
                                  <label
                                    htmlFor="sortingCode"
                                    className="form-label lable-align"
                                  >
                                    Sort Code
                                  </label>
                                  <input
                                    type="text"
                                    name="sortingCode"
                                    value={currentUserSortingCode || ''}
                                    onChange={(e) =>
                                      setCurrentUserSortingCode(e.target.value)
                                    }
                                    placeholder="Enter Sorting Code"
                                    className="form-control"
                                    id="sortingCode"
                                    required
                                  />
                                </div>
                                <div className="col-sm-12 col-md-6">
                                  <label
                                    htmlFor="accountNo"
                                    className="form-label lable-align"
                                  >
                                    Account No.
                                  </label>
                                  <input
                                    type="text"
                                    name="accountNo"
                                    value={currentUserBankId || ''}
                                    onChange={(e) =>
                                      setCurrentUserBankId(e.target.value)
                                    }
                                    placeholder="Enter Account No."
                                    className="form-control"
                                    id="accountNo"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              linkAccount(
                                currentUserBankname,
                                currentUserBankId,
                                currentUserSortingCode
                              );
                            }}
                          >
                            <input
                              type="submit"
                              value="Submit"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              disabled={!(currentUserBankId && currentUserSortingCode && currentUserBankname)}
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="row">
                    {accountLoader ? (
                      <div className="account-loader--container">
                        <Loader />
                      </div>
                    ) : data && data?.length < 1 ? (
                      <div className="no-account-text">
                        No accounts linked yet!
                      </div>
                    ) : (
                      data.map((account, i) => (
                        <div
                          key={i}
                          className="col-3"
                          style={{ width: '18rem !important' }}
                        >
                          <div className="card border-info mb-3" key={i}>
                            <div className="card-header">
                              {account.bankName}
                              <CloseCircleFilled
                                style={{
                                  float: 'right',
                                  cursor: 'pointer',
                                  marginTop: '4px',
                                }}
                                title="De-Link Account"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalDelinkAcc"
                                onClick={() => setClickedBankAccount({bankName: account.bankName, accountNo: account.bankAccountId})}
                              />
                            </div>
                            <div
                              className="modal fade"
                              id="exampleModalDelinkAcc"
                              tabIndex="-1"
                              aria-labelledby="exampleModalDelinkAcc"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalDelinkAcc"
                                    >{`De-Link ${clickedBankAccount.bankName} Account`}</h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body">
                                    {`${clickedBankAccount.bankName} Account with account Id: ${clickedBankAccount.accountNo} will be de-linked by the wallet permanently.`}
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                      onClick={() =>
                                        deLinkAccount(clickedBankAccount.accountNo)
                                      }
                                    >
                                      De-Link
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <span> Available Balance:</span>
                              {/* <h5 className="card-title">
                                {account.accountBalance}
                              </h5> */}
                              <a className="balance--link" href="#">
                                Check Balance
                              </a>
                              <div style={{ display: 'flex' }}>
                                <span style={{ flex: 1 }}>
                                  Account No: ***
                                  {account.bankAccountId &&
                                    account.bankAccountId.slice(-4)}
                                </span>
                                {/* <p className="card-text">
                                  <a
                                    style={{
                                      textDecoration: 'underline',
                                      cursor: 'pointer',
                                      alignContent: 'flex-end',
                                    }}
                                  >
                                    Transfer
                                  </a>
                                </p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
