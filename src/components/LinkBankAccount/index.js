import React, { useEffect, useState } from 'react';
import './index.css';

/**
 * Top Repos List
 *
 * @description: Shows the list of Top Repos for a Github User
 * @returns Bootstrap List Group of Top Repos
 */
function LinkBankAccount() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  };

  useEffect(() => {}, []);

  return (
    <div className="outer-container">
      <form onSubmit={handleSubmit}>
        <div className="header"> New Bank Account</div>
        <div className="content">
          <div className="mb-3 row">
            <label
              htmlFor="accountName"
              className="col-sm-5 col-form-label lable-align"
            >
              Name on the Account
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                minLength="5"
                placeholder="Enter Name on the Account"
                name="accountname"
                value={inputs.accountname || ''}
                onChange={handleChange}
                maxLength="64"
                className="form-control"
                id="accountName"
                required="true"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="accountNumber"
              className="col-sm-5 col-form-label lable-align"
            >
              Account Number
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Account Number"
                name="accountnumber"
                value={inputs.accountnumber || ''}
                onChange={handleChange}
                id="accountNumber"
                required="true"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="repeatAccountNumber"
              className="col-sm-5 col-form-label lable-align"
            >
              Repeat Account Number
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Repeat Account Number"
                name="repeataccountnumber"
                value={inputs.repeataccountnumber || ''}
                onChange={handleChange}
                id="repeatAccountNumber"
                required="true"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="ifsc"
              className="col-sm-5 col-form-label lable-align"
            >
              IFSC code
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                placeholder="Enter IFSC Code"
                name="ifsc"
                value={inputs.ifsc || ''}
                onChange={handleChange}
                required="true"
                id="ifsc"
              />
            </div>
          </div>
        </div>

        <button
          className="button"
          style={{ backgroundColor: '#0047AB' }}
          type="submit"
        >
          {' '}
          Add
        </button>
      </form>
    </div>
  );
}

export default LinkBankAccount;
