import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import {
  minMaxLength,
  passwordStrength
} from '../Validation';

/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function UserDetails(props) {
  const {nextStep, userDetailsValue } = props;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    step: 1,
    email: '',
    username: '',
    mobileNumber: '',
    password: '',
    formErrors: { email: '', username: '', mobileNumber: '', password: '' },
    emailValid: false,
    usernameValid: false,
    mobileNumberValid: false,
    passwordValid: false,
    formValid: false,
  });
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'mobileNumber') {
      setForm((values) => ({
        ...values,
        [name]: normalizeInput(value, form.mobileNumber),
      }));
    } else {
      setForm((values) => ({ ...values, [name]: value }));
    }
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = form.formErrors;
    let emailValid = form.emailValid;
    let usernameValid = form.usernameValid;
    let passwordValid = form.passwordValid;

    switch (fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
      break;
    case 'username':
      usernameValid = value.length >= 2;
      fieldValidationErrors.username = usernameValid
        ? ''
        : 'Username should have minimum 2 characters';
      break;
    case 'password':
      fieldValidationErrors.password = '';
      passwordValid = !minMaxLength(value, 6) && !passwordStrength(value);
      if (minMaxLength(value, 6)) {
        fieldValidationErrors.password = !minMaxLength(value, 6)
          ? ''
          : 'Password should have minimum 6 characters';
        break;
      }
      if (passwordStrength(value))
        fieldValidationErrors.password = !passwordStrength(value)
          ? ''
          : 'Password is not strong enough. Include an upper case letter, a number or a special character to make it strong';
      break;

    default:
      break;
    }
    setForm((values) => ({
      ...values,
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      usernameValid: usernameValid,
      passwordValid: passwordValid,
    }));

    validateForm();
  };

  const validateForm = () => {
    setForm((values) => ({
      ...values,
      formValid: form.emailValid && form.usernameValid && form.passwordValid,
    }));
  };

  const errorClass = (error) => {
    return error.length === 0 ? '' : 'has-error';
  };

  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7)
        return `${currentValue.slice(0, 3)} ${currentValue.slice(3)}`;
      return `${currentValue.slice(0, 3)} ${currentValue.slice(
        3,
        6
      )} ${currentValue.slice(6, 10)}`;
    }
  };

  const onSignup = () => {
    nextStep(form, 'UserDetails');
  };

  const navigateTo = () => {
    navigate('/');
  };

  useEffect(() => {
    if (userDetailsValue != null) {
      setForm(userDetailsValue);
    }
  }, [userDetailsValue]);
  return (
    <>
      <form className="demoForm">
        <div className="form-container">
          <div className="title"> Sign Up</div>
          <div className={`form-group form-elements ${errorClass(form.formErrors.username)}`}>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className={
                form.formErrors.username.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="username"
              placeholder="Please enter username"
              value={form.username}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.username}</div>}
          </div>
          <div className={`form-group form-elements ${errorClass(form.formErrors.email)}`}>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              required
              className={
                form.formErrors.email.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="email"
              placeholder="Please enter email address"
              value={form.email}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.email}</div>}
          </div>

          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.password
            )}`}
          >
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              required
              className={
                form.formErrors.password.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="password"
              placeholder="Please enter password"
              value={form.password}
              onChange={(e) => handleUserInput(e)}
            />
            {<div className="invalid-feedback">{form.formErrors.password}</div>}
          </div>

          <div
            className={`form-group form-elements ${errorClass(
              form.formErrors.mobileNumber
            )}`}
          >
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              required
              className={
                form.formErrors.mobileNumber.length > 0
                  ? 'is-invalid form-control'
                  : 'form-control'
              }
              name="mobileNumber"
              placeholder="Please enter mobile number"
              value={form.mobileNumber}
              onChange={(e) => handleUserInput(e)}
            />
            {
              <div className="invalid-feedback">
                {form.formErrors.mobileNumber}
              </div>
            }
          </div>

          <div className="button-container">
            <button
              type="button"
              className="btn btn-light cancel"
              onClick={() => navigateTo('/')}
            >Cancel</button>
            <button
              type="button"
              className="btn btn-primary action"
              disabled={!form.formValid}
              onClick={() => onSignup()}
            >Next</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserDetails;