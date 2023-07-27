import React, { useEffect, useState } from 'react';
import './index.css';
import noImage from '../../assets/images/noProfilePic.png';

function ProfileDetails({ currentUserData, currentUserWalletData }) {
  const [userData, setUserData] = useState({});
  const [walletData, setWalletData] = useState({});
  const [address, setAddress] = useState('');

  useEffect(() => {
    setUserData(currentUserData);
    setWalletData(currentUserWalletData);
    if (currentUserData?.address) {
      const adrs1 = currentUserData?.address?.address1;
      const city = currentUserData?.address?.address1;
      const state = currentUserData?.address?.state;
      const country = currentUserData?.address?.country;
      const zip = currentUserData?.address?.zip;
      const adrs = `${adrs1}, ${
        currentUserData?.address?.address2
          ? currentUserData?.address?.address2 + ','
          : ''
      } ${city}, ${state}, ${country}, ${zip}`;
      setAddress(adrs);
    }
  }, [currentUserData, currentUserWalletData]);

  return (
    <>
      <section className="common--section">
        <div className="common-section-header">
          <span className="section-detail--text">Profile Details</span>
        </div>
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 profile-pic-section">
            {currentUserData?.profilePic ? (
              <img
                className="profile-image"
                width="200px"
                height="200px"
                alt="profile-image"
                src={userData?.profilePic}
              />
            ) : (
              <img
                className="profile-image"
                width="200px"
                height="200px"
                alt="profile-image"
                src={noImage}
              />
            )}
            <span className="profile--username">
              {currentUserData?.username}
            </span>
          </div>
          <div className="col-lg-10 col-md-8 col-sm-6">
            <div className="details-container">
              <div className="details-box--style2">
                <span className="profile--label">First Name:</span>
                <div className="profile-value--box">
                  <span className="profile-value--text">
                    {userData?.name?.firstName}
                  </span>
                </div>
              </div>
              {userData?.name?.middleName && (
                <div className="details-box--style2">
                  <span className="profile--label">Middle Name:</span>
                  <div className="profile-value--box">
                    <span className="profile-value--text">
                      {userData?.name?.middleName}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="details-container">
              <div className="details-box--style2">
                <span className="profile--label">Last Name:</span>
                <div className="profile-value--box">
                  <span className="profile-value--text">
                    {userData?.name?.lastName}
                  </span>
                </div>
              </div>
              <div className="details-box--style2">
                <span className="profile--label">Birth Date:</span>
                <div className="profile-value--box">
                  <span className="profile-value--text">
                    {userData?.dateOfBirth}
                  </span>
                </div>
              </div>
            </div>
            <div className="details-box--style2">
              <span className="profile--label">Contact Number:</span>
              <div className="profile-value--box">
                <span className="profile-value--text">
                  {userData?.mobileNumber}
                </span>
              </div>
            </div>
            <div className="details-box--style2">
              <span className="profile--label">Email Address:</span>
              <div className="profile-value--box">
                <span className="profile-value--text">
                  {userData?.emailAddress}
                </span>
              </div>
            </div>
            <div className="details-box--style2">
              <span className="profile--label">Address:</span>
              <div className="profile-value--box">
                <span className="profile-value--text">{address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="common--section">
        <div className="common-section-header">
          <span className="section-detail--text">Wallet Details</span>
        </div>
        {walletData?.id ? (
          <>
            <div className="details-container">
              <div className="details-box--style2">
                <span className="profile--label">Wallet Balance:</span>
                <div className="profile-value--box">
                  <span className="profile-value--text">{`${walletData?.accountBalance} ${walletData?.currency}`}</span>
                </div>
              </div>
              <div className="details-box--style2">
                <span className="profile--label">Wallet Status:</span>
                <div className="profile-value--box">
                  <span className="profile-value--text">
                    {walletData?.status}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-wallet-found">
            <span className="no-wallet-found--text">
              No Wallet Details Found!
            </span>
          </div>
        )}
      </section>
    </>
  );
}

export default ProfileDetails;
