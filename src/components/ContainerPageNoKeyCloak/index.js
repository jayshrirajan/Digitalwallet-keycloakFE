import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import WelcomeScreen from '../WelcomeScreen';
import { useEffect } from 'react';
import Dashboard from '../Dashboard';
import Signup from '../SignupPage';
import Success from '../SignupPage/Success';
import Wallet from '../Wallet';
import Transaction from '../Transactions';

/**
 * Container Page
 *
 * @description: Container Page containing all the MFEs
 * @returns Combined MFEs
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomeScreen />,
  },

  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/success',
    element: <Success />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/linkBank',
    element: <Wallet />,
  },
  {
    path: '/wallet',
    element: <Wallet />,
  },
  {
    path: '/transaction',
    element: <Transaction />,
  },
]);

function ContainerPageNoKeyCloak() {
  useEffect(() => {}, []);

  return (
    <div className="maincontainer">
      <Suspense fallback={<div>Loading</div>}>
        <div className="container-page">
          <RouterProvider router={router} />
        </div>
      </Suspense>
    </div>
  );
}

export default ContainerPageNoKeyCloak;
