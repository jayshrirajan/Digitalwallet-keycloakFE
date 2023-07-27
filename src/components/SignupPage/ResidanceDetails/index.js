import React, { useState, useEffect } from 'react';
import './index.css';
import CountryCurrency from '../../../services/countryCurreny.json';

/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function ResidanceDetails(props) {
  const { handleUpdate, nextStep, errorMessage, residanceDetailsValue } = props;
  const [countryOption, setCountryOption] = useState([]);
  const [form, setForm] = useState({
    step: 1,
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    formErrors: { address1: '', city: '', state: '', country: '', zip: '' },
    address1Valid: false,
    address2Valid: false,
    cityValid: false,
    stateValid: false,
    formValid: false,
    countryValid: false,
    zipValid: false,
  });
  const [errorMsg, setErrorMsg] = useState(errorMessage);
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((values) => ({ ...values, [name]: value }));
    validateField(name, value);
  };

  const handleUserOptionInput = (e) => {
    const value = e.target.value;
    setForm((values) => ({ ...values, ['country']: value }));
    validateField('country', value);
  };

  useEffect(() => {
    setCountryOption(CountryCurrency);
  }, []);

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = form.formErrors;
    let address1Valid = form.address1Valid;
    let cityValid = form.cityValid;
    let stateValid = form.stateValid;
    let countryValid = form.countryValid;
    let zipValid = form.zipValid;

    switch (fieldName) {
    case 'address1':
      address1Valid = value.length >= 2;
      fieldValidationErrors.address1 = address1Valid
        ? ''
        : 'address1 should have minimum 2 characters';
      break;
    case 'city':
      cityValid = value.length >= 2;
      fieldValidationErrors.city = cityValid
        ? ''
        : 'city should have minimum 2 characters';
      break;
    case 'state':
      stateValid = value.length >= 2;
      fieldValidationErrors.state = stateValid
        ? ''
        : 'state should have minimum 2 characters';
      break;
    case 'country':
      countryValid =
          value !== 'Select Country' || value !== '' || value !== null;
      fieldValidationErrors.country = countryValid
        ? ''
        : 'Please select country';
      break;
    case 'zip':
      zipValid = value.length >= 2;
      fieldValidationErrors.zip = zipValid
        ? ''
        : 'Zip should have minimum 2 characters';
      break;
    default:
      break;
    }
    setForm((values) => ({
      ...values,
      formErrors: fieldValidationErrors,
      address1Valid: address1Valid,
      cityValid: cityValid,
      stateValid: stateValid,
      countryValid: countryValid,
      zipValid: zipValid,
    }));

    validateForm();
  };

  const validateForm = () => {
    setForm((values) => ({
      ...values,
      formValid:
        form.address1Valid &&
        form.cityValid &&
        form.stateValid &&
        form.countryValid &&
        form.zipValid,
    }));
  };

  const errorClass = (error) => {
    return error?.length === 0 ? '' : 'has-error';
  };
  const onSignup = () => {
    nextStep({ ...form }, 'Residance');
  };

  const redirectTo = () => {
    handleUpdate(3);
  };

  useEffect(() => {
    if (residanceDetailsValue != null) {
      setForm(residanceDetailsValue);
    }
    setErrorMsg(errorMessage);
  }, [errorMessage, residanceDetailsValue]);
  return (
    <>
      <form className="demoForm">
        <div className="form-container">
          <div className="title"> Sign Up</div>
          <div className="error-message">{errorMsg}</div>
          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.address1
            )}`}
          >
            <label htmlFor="address1" className="form-label">
              Address 1
            </label>
            <input
              type="text"
              className={
                form.formErrors.address1.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="address1"
              placeholder="Please enter address 1"
              value={form.address1}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.address1}</div>}
          </div>
          <div className="form-group form-elements">
            <label htmlFor="address2" className="form-label">
              Address 2
            </label>
            <input
              type="text"
              required
              className='form-control'
              name="address2"
              placeholder="Please enter email address 2"
              value={form.address2}
              onChange={(e) => handleUserInput(e)}
            />
          </div>

          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.city
            )}`}
          >
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              required
              className={
                form.formErrors.city.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="city"
              placeholder="Please enter city"
              value={form.city}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.city}</div>}
          </div>

          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.state
            )}`}
          >
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              required
              className={
                form.formErrors.state.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="state"
              placeholder="Please enter state"
              value={form.state}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.state}</div>}
          </div>

          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.country
            )}`}
          >
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-select header select-wrapper-res-input"
              aria-label="Default select example"
              onClick={(e) => handleUserOptionInput(e)}
              id="country"
              name="country"
            >
              <option className="sel-acc-opt" value="Select Country">
                Select Country
              </option>
              {countryOption?.map((cty) => (
                <option
                  key={cty?.country}
                  value={cty?.country}
                  className="sel-acc-opt"
                >
                  {cty?.country}
                </option>
              ))}
            </select>
            {<div className="invalid-feedback">{form.formErrors.country}</div>}
          </div>

          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.zip
            )}`}
          >
            <label htmlFor="zip" className="form-label">
              Postal Zip Code
            </label>
            <input
              type="text"
              required
              className={
                form.formErrors.zip.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="zip"
              placeholder="Please enter Postal Zip Code"
              value={form.zip}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.zip}</div>}
          </div>

          <div className="button-container">
            <button
              type="button"
              className="btn btn-light cancel"
              onClick={() => redirectTo('identification')}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary action"
              disabled={!form.formValid}
              onClick={() => onSignup()}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ResidanceDetails;
