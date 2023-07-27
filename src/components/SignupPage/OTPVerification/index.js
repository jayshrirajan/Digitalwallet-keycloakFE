import React, { useState, useEffect } from 'react';
import './index.css';

/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function OTPVerification(props) {
  const {handleUpdate, nextStep, userDetailsValue} = props;
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useState(userDetailsValue);
  const [isResendEnable, setIsResendEnable] = useState(false);
  const [form, setForm] = useState({
    step: 2,
    otp: '',
    formErrors: {otp: '', lastName: '', middleName: ''},
    otpValid: false,
    formValid: true
  });
   

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm(values => ({...values, [name]: value}));
    validateField(name, value);
  }

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = form.formErrors;
    let otpValid = form.otpValid;  
    switch(fieldName) {        
    case 'otp':
      otpValid = value.length === 6;
      fieldValidationErrors.otp = otpValid ? '': 'OTP should have 6 digits';
      break;
    default:
      break;
    }
    setForm(values => ({...values, formErrors: fieldValidationErrors,
      otpValid:otpValid}));
    validateForm();
                    
                    
  }

  const validateForm = () => {
    setForm(values => ({...values, formValid: form.otpValid}));      
  }

  const errorClass=(error)=> {
    return(error.length === 0 ? '' : 'has-error');
  }


  const verifyOTP = async() => {
    const response = await fetch(
      'http://3.232.225.73/notification/verify',
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({'identifier': '+91'+ `${userDetails.mobileNumber.replaceAll(/\s/g,'')}` ,'token':form.otp, 'channel':'sms'}),
      }
    );
    const data = await response.json();
    console.log(data);
    if(data.result==='approved' || data.result==='VERIFIED'){
      nextStep(form, 'otp');
    }
    else{
      let fieldValidationErrors = form.formErrors;
      fieldValidationErrors.otp = 'Please enter valid OTP' 
      setForm(values => ({...values, formErrors: fieldValidationErrors,
        otpValid:false}));
      validateForm();
    }
    
      

  }

  const reSendOTP = async() => {
    setIsResendEnable(false);
    setForm(values => ({...values, otp: ''}));
    const response = await fetch(
      'http://3.232.225.73/notification/OTP',
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({'identifier': '+91'+ `${userDetails.mobileNumber.replaceAll(/\s/g,'')}`, 'channel':'sms'}),
      }
    );
    const data = await response.json();
    console.log(data);
    setTimeout(() => {
      setIsResendEnable(true);
    }, 3000);

  }


  const redirectTo = () =>{
    handleUpdate(1);
  }
  

  useEffect(()=>{

    setTimeout(() => {
      setIsResendEnable(true);
    }, 3000);
  },[]);
  return (
    <>

      <form className="demoForm">
        <div className="form-container">
          <div className="title"> Sign Up</div>

          {/* <div className="otp-label" style={{textAlign:'center', paddingBottom:'10px', fontSize: '15px'}}>OTP Verification</div>
         */}<div className={`form-group form-elements ${errorClass(form.formErrors.otp)}`}>
            <label htmlFor="otp" className="form-label">Please enter otp sent to +91 {userDetails.mobileNumber}</label>
            <input type="number" className={form.formErrors.otp.length > 0 ? 'is-invalid form-control' : 'form-control'} name="otp"
              placeholder="Please enter otp"
              value={form.otp}
              onChange={(e)=>handleUserInput(e)}  />
            {
              <div className="invalid-feedback">{form.formErrors.otp}</div>
            }
          </div>
       
        
       
        
          <div className="btn-container">
            <button type="button"  className="btn btn-light cancel" onClick={()=>redirectTo('userDetails')}>Back</button>
            <button type="button"  className="btn btn-primary action" disabled={!form.otpValid }  onClick={()=>verifyOTP()}>Verify OTP</button>
            {/* <button type="button"  className="btn btn-primary action" disabled={!form.formValid}  onClick={(e)=>onSignup(signupjson)}>Verify OTP</button>
               */}
          </div>
          <div className="re-send-container">
            <button 
              type="button"
              onClick={()=>reSendOTP()}
              className="btn btn-link link-color resend" disabled={!isResendEnable}>
                Re-send OTP
            </button>
          </div>
        </div>
        
      </form>
    </> 
  );
}

export default OTPVerification;


