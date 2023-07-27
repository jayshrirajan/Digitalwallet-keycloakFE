import React, { useState, useEffect } from 'react';
import './index.css';
import { DatePicker } from 'antd';

/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function PersonalDetails(props) {
  const { handleUpdate, nextStep, personnalDetailsValue } = props;
  const [form, setForm] = useState({
    step: 2,
    firstName: '',
    lastName: '',
    middleName: '',
    formErrors: { firstName: '', lastName: '' },
    firstNameValid: false,
    lastNameValid: false,
    formValid: false,
  });
  const [birthDate, setBirthDate] = useState('');
  // const [birthDateValid, setBirthDateValid] = useState(false);
  const [birthDateValidor, setBirthDateValidor] = useState('');

  const handleUserInput = (e) => {
    const name = e?.target?.name;
    const value = e.target.value;
    setForm((values) => ({ ...values, [name]: value }));
    validateField(name, value);
  };

  const handleBirthDateInput = (date) => {
    const dateT = date?.$d?.toISOString();
    // setBirthDateValid(birthDate !== null || birthDate !== undefined || birthDate !== '');
    setBirthDate(dateT);
    setBirthDateValidor('');
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = form.formErrors;
    let firstNameValid = form.firstNameValid;
    let lastNameValid = form.lastNameValid;

    switch (fieldName) {
    case 'firstName':
      firstNameValid = value.length >= 2;
      fieldValidationErrors.firstName = firstNameValid
        ? ''
        : 'first name should have minimum 2 characters';
      break;
    case 'lastName':
      lastNameValid = value.length >= 2;
      fieldValidationErrors.lastName = lastNameValid
        ? ''
        : 'last name should have minimum 2 characters';
      break;

    default:
      break;
    }
    setForm((values) => ({
      ...values,
      formErrors: fieldValidationErrors,
      firstNameValid: firstNameValid,
      lastNameValid: lastNameValid,
    }));

    validateForm();
  };

  const validateForm = () => {
    setForm((values) => ({
      ...values,
      formValid: form.firstNameValid && form.lastNameValid,
    }));
  };

  const errorClass = (error) => {
    return error?.length === 0 ? '' : 'has-error';
  };

  const onSignup = () => {
    if (
      !birthDate ||
      birthDate === null ||
      birthDate === undefined ||
      birthDate === ''
    ) {
      setBirthDateValidor('Please enter date of birth');
    } else {
      nextStep({ ...form, dateOfBirth: birthDate }, 'personalDetails');
    }
  };

  const redirectTo = () => {
    handleUpdate(1);
  };

  useEffect(() => {
    if (personnalDetailsValue != null) {
      setForm(personnalDetailsValue);
    }
  }, [personnalDetailsValue]);
  return (
    <>
      <form className="demoForm">
        <div className="form-container">
          <div className="title"> Sign Up</div>
          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.firstName
            )}`}
          >
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className={
                form.formErrors.firstName.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="firstName"
              placeholder="Please enter first name"
              value={form.firstName}
              onChange={(e) => handleUserInput(e)}
            />
            {
              <div className="invalid-feedback">
                {form.formErrors.firstName}
              </div>
            }
          </div>
          <div className="form-group form-elements">
            <label htmlFor="middleName" className="form-label">
              Middle name
            </label>
            <input
              type="text"
              className="form-control"
              name="middleName"
              placeholder="Please enter middle name"
              value={form.middleName}
              onChange={(e) => handleUserInput(e)}
            />
          </div>
          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.lastName
            )}`}
          >
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className={
                form.formErrors.lastName.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="lastName"
              placeholder="Please enter last name"
              value={form.lastName}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.lastName}</div>}
          </div>

          <div className="form-group form-elements">
            <label htmlFor="birthDate" className="form-label">
              Date Of Birth
            </label>
            <DatePicker
              name="birthDate"
              onChange={handleBirthDateInput}
              className="pd-datepicker"
            />
            <div className="invalid-feedback bDate-invalid">
              {birthDateValidor}
            </div>
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
              disabled={!form.formValid}
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

export default PersonalDetails;
