import React, { useState, useEffect } from 'react';
import './index.css';

/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function IdentificationDetails(props) {
  const {handleUpdate, nextStep, identificationDetailsValue } =
    props;
  const [form, setForm] = useState({
    step: 3,
    identificationNumber: '',
    identificationType: '',
    expiryDate: '',
    password: '',
    formErrors: {
      identificationNumber: '',
      identificationType: '',
      expiryDate: '',
    },
    identificationNumberValid: false,
    identificationTypeValid: false,
    expiryDateValid: false,
    formValid: false,
  });

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((values) => ({ ...values, [name]: value }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = form.formErrors;
    let identificationTypeValid = form.identificationTypeValid;
    let identificationNumberValid = form.identificationNumberValid;
    let expiryDateValid = form.expiryDateValid;

    switch (fieldName) {
    case 'identificationNumber':
      identificationNumberValid = value.length >= 2;
      fieldValidationErrors.identificationNumber = identificationNumberValid
        ? ''
        : 'identification number should have minimum 2 characters';
      break;
    case 'identificationType':
      identificationTypeValid = value !== '' || value !== 'Select Identification Type';
      fieldValidationErrors.identificationType = identificationTypeValid
        ? ''
        : 'identification number should have minimum 2 characters';
      break;
    default:
      break;
    }
    setForm((values) => ({
      ...values,
      formErrors: fieldValidationErrors,
      identificationNumberValid: identificationNumberValid,
      identificationTypeValid: identificationTypeValid,
      expiryDateValid: expiryDateValid,
    }));

    validateForm();
  };

  const validateForm = () => {
    setForm((values) => ({
      ...values,
      formValid:
        form.expiryDateValid &&
        form.identificationNumberValid &&
        form.identificationTypeValid,
    }));
  };

  const errorClass = (error) => {
    return error.length === 0 ? '' : 'has-error';
  };

  const onSignup = () => {
    nextStep(form, 'IdentificationDetails');
  };

  const redirectTo = () => {
    handleUpdate(2);
  };

  useEffect(() => {
    if (identificationDetailsValue != null) {
      setForm(identificationDetailsValue);
    }
  }, [identificationDetailsValue]);

  const handleUserOptionInput = (e) => {
    setForm((values) => ({ ...values, identificationType: e.target.value }));
    validateField('identificationType', e.target.value);
  }

  return (
    <>
      <form className="demoForm">
        <div className="form-container">
          <div className="title"> Sign Up</div>
          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.identificationType
            )}`}
          >
            <label htmlFor="identificationType" className="form-label">
              Identification Type
            </label>
            <select
              className="form-select header select-wrapper-idf-input"
              aria-label="Default select example"
              onClick={(e) => handleUserOptionInput(e)}
              id="identificationType"
              name='identificationType'
            >
              <option className='sel-acc-opt' value="Select Identification Type">
                              Select Identification Type
              </option>
              <option className='sel-acc-opt' value="driving license">Driving License</option>
              <option className='sel-acc-opt' value="pan card">Pan Card</option>
            </select>
            {<div className="invalid-feedback">{form.formErrors.country}</div>}
          </div>
          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.identificationNumber
            )}`}
          >
            <label htmlFor="identificationNumber" className="form-label">
              Identification Number
            </label>
            <input
              type="identificationNumber"
              required
              className={
                form.formErrors.identificationNumber.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="identificationNumber"
              placeholder="Please enter identification number address"
              value={form.identificationNumber}
              onChange={(e) => handleUserInput(e)}
            />
            {
              <div className="invalid-feedback">
                {form.formErrors.identificationNumber}
              </div>
            }
          </div>

          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.expiryDate
            )}`}
          >
            <label htmlFor="expiryDate" className="form-label">
              Identification Expiry Date
            </label>
            <input
              type="month"
              required
              className={
                form.formErrors.expiryDate.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="expiryDate"
              placeholder="Please enter expiry date"
              value={form.expiryDate}
              onChange={(e) => handleUserInput(e)}
            />
            {
              <div className="invalid-feedback">
                {form.formErrors.expiryDate}
              </div>
            }
          </div>

          <div className="button-container">
            <button
              type="button"
              className="btn btn-light cancel"
              onClick={() => redirectTo('userDetails')}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary action"
              onClick={() => onSignup()}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default IdentificationDetails;
