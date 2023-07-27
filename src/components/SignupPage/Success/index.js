import React from 'react';
import { useNavigate} from 'react-router-dom';
import Header from '../../Header';
import './index.css';
function Success() {
  const navigate = useNavigate();

  const navigateTo =() =>{
    navigate('/');
  }
  return(
    <>
      <Header ></Header>
      <div style={{paddingTop:'5%'}}>
        <div className="card text-white bg-primary mb-3 wallet-details-card-success" >
          <div className="card-body">
            <h5 className="card-title custom-title-success">User Created Successfully </h5>
            <div className="details-wrapper-success">
              <button type="button"  className="btn btn-link"  onClick={()=>navigateTo()}>Go To Home Page</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Success