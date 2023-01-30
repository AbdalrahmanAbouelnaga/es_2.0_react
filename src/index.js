import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

import './styles/globals.css'
import { Layout } from './components/Layout'
import Login from './pages/Login';
import SignUp  from './pages/SignUp';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalContext';

import axios from 'axios'

axios.defaults.baseURL = 'https://e-store-2-test.up.railway.app/'

const router = createBrowserRouter([
  {
    path:"/",
    name:"home",
    element:<App />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/signup",
    element:<SignUp />
  }

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


