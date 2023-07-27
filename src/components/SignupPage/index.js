import React, { useState, useEffect } from 'react';
import Header from '../Header';
import IdentificationDetails from './IdentificationDetails';
import './index.css';
import { useNavigate} from 'react-router-dom';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import ResidanceDetails from './ResidanceDetails';
import signupJSON  from '../../services/signup.json';
import {signup} from '../../services/ApiService';
import OTPVerification from './OTPVerification';
import Loader from '../Loader';


/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function Signup() {

  const [step, setStep] = useState(1);
  const [userDetailsValue, setUserDetailsValue] = useState(null);
  const [personnalDetailsValue, setPersonnalDetailsValue] = useState(null);
  const [identificationDetailsValue, setIdentificationDetailsValue] = useState(null);
  const [residanceDetailsValue, setResidanceDetailsValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Proceed to next step
  const nextStep = async(form, position) => {
    if(position==='UserDetails'){
      signupJSON.username = form.username;
      signupJSON.password = form.password;
      signupJSON.emailAddress = form.email;
      signupJSON.mobileNumber = form.mobileNumber;
      setUserDetailsValue(form);
      const response = await fetch(
        'http://3.232.225.73/notification/OTP',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(
            {'identifier': '+91'+ `${signupJSON.mobileNumber.replaceAll(/\s/g,'')}` ,'channel':'sms'}),
        }
      );
      const data = await response.json();
      console.log(data);
    }
    else if(position==='personalDetails'){
      signupJSON.name.firstName = form.firstName;
      signupJSON.name.lastName = form.lastName;
      signupJSON.name.middleName = form.middleName;
      signupJSON.dateOfBirth = form.dateOfBirth;
      setPersonnalDetailsValue(form);

    }
    else if( position==='Residance'){
      setResidanceDetailsValue(form);
      signupJSON.address.address1 = form.address1;
      signupJSON.address.address2 =form.address2;
      signupJSON.address.city = form.city;
      signupJSON.address.state = form.state;
      signupJSON.address.country = form.country;
      signupJSON.address.zip = form.zip;
      setLoading(true);
      signup(signupJSON).then((data)=>{
        if(data.success === true){
          navigate('/success');
          setLoading(false);
        }
        else{
          setLoading(false);
          console.log(data);
          setErrorMessage(data.message)
        }
      })
    }
    else if(position==='IdentificationDetails'){
      signupJSON.kycIdentityType = form.identificationType;
      signupJSON.kycIdentiyNumber = form.identificationNumber;
      signupJSON.kycIdentityExpiration = form.expiryDate
      setIdentificationDetailsValue(form);
      setStep(4);
    }
    else if(position==='otp'){
    
      const response = await fetch(
        'http://3.232.225.73/notification/OTP',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({'identifier': form.mobileNumber,'channel':'sms'}),
        }
      );
      const data = await response.json();
      console.log(data);
      setStep(4);
    }
    
    if(position !='Residance'){
      setStep(step+1);
    }
    
  };

  // go to prev step
  const handleUpdate = (step) => {
    setErrorMessage(null);
    setStep(step);
  };
  
  useEffect(()=>{
    
  },[]);

  return (
    <>
      <Header page={'signup'}></Header>
      {
        loading ? <div className='welcome--loader'><Loader /></div> : (
          <div className="welcome-container">
            <div className="left-container">
              {/* <img alt="logo" className="img-logo" src={MSysLogo} /> */}
            </div>
            <div className="right-container">
              <div  className="sign-up-content">
                <div className="sign-up-container" >
        
                  {(() => {
                    switch (step) {
                    case 1:
                      return <UserDetails  userDetailsValue = {userDetailsValue}  step={step} handleUpdate={handleUpdate}
                        nextStep={nextStep} />

                    case 2:
                      return <OTPVerification  userDetailsValue = {userDetailsValue}  step={step} handleUpdate={handleUpdate}
                        nextStep={nextStep} />
           
                    case 3:
                      return <PersonalDetails personnalDetailsValue={personnalDetailsValue}  step={step} handleUpdate={handleUpdate}
                        nextStep={nextStep} />

                    case 4:
                      return <IdentificationDetails  identificationDetailsValue = {identificationDetailsValue}  step={step} handleUpdate={handleUpdate}
                        nextStep={nextStep} />

                    case 5:
                      return <ResidanceDetails residanceDetailsValue= {residanceDetailsValue} errorMessage = {errorMessage} step={step} handleUpdate={handleUpdate}
                        nextStep={nextStep} />
         
                    default:
                      return null
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
        
  );
}

export default Signup;
