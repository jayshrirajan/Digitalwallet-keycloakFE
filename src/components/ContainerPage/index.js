import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './index.css';
import WelcomeScreen from '../WelcomeScreen';
import { useEffect } from 'react';
import Dashboard from '../Dashboard';
import RenderOnAnonymous from '../../RenderOnAnonymous';
import RenderOnAuthenticated from '../../RenderOnAuthenticated';
import Signup from '../SignupPage';
import Header from '../Header';
import Wallet from '../Wallet';
import Success from '../SignupPage/Success';
import Transaction from '../Transactions';

/**
 * Container Page
 *
 * @description: Container Page containing all the MFEs
 * @returns Combined MFEs
 */

const routerAfterAuth = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
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
    path: '/wallet',
    element: <Wallet />,
  },
  {
    path: '/transaction',
    element: <Transaction />,
  },
]);


// const routerAfterAuth = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Dashboard />}>
//       <Route path="dashboard" element={<Dashboard />} />
//       <Route path="linkBank" element={<LinkBankAccount />} />
//       <Route path="addMoney" element={<AddMoneyToWallet />} />
//       <Route path="wallet" element={<Wallet />} />
//       <Route path="transaction" element={<Transaction />} />
//     </Route>
//   )
// );

const routerBeforeAuth = createBrowserRouter([
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
  }
]);


// const routerBeforeAuth = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<WelcomeScreen />}>
//       <Route path="signup" element={<Signup />} />
//       <Route path="success" element={<Success />} />
//     </Route>
//   )
// );

function ContainerPage({ store }) {
  useEffect(() => {}, []);

  return (
    <div className="maincontainer">
      <Suspense fallback={<div>Loading</div>}>
        <Provider store={store}>
          <RenderOnAnonymous>
            <div className="container-page">
              <RouterProvider router={routerBeforeAuth} />
            </div>
          </RenderOnAnonymous>
          <RenderOnAuthenticated>
            <div className="container-page">
              <RouterProvider router={routerAfterAuth}>
                <Header></Header>
              </RouterProvider>
            </div>
          </RenderOnAuthenticated>
        </Provider>
      </Suspense>
    </div>
  );
}

export default ContainerPage;
