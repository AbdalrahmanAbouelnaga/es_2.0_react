import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

import './styles/globals.css'
import { Layout } from './components/Layout'
import Login from './pages/Login';
import SignUp  from './pages/SignUp';
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import MyAccount from './pages/MyAccount';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import NotFound from './pages/NotFound';



import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import axios from 'axios'

axios.defaults.baseURL = 'https://estore2.up.railway.app'

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
  },
  {
    path:"/:subcategory_slug/products",
    element:<ProductList />
  },
  {
    path:"/product/:product",
    element: <ProductDetail />
  },
  {
    path:"/cart",
    element:<Cart />
  },
  {
    path:'/cart/checkout/',
    element:<Checkout />
  },
  {
    path:'/cart/checkout/success/',
    element:<Success />
  },
  {
    path:'/myaccount',
    element:<MyAccount />
  },
  {
    path:"*",
    element: <NotFound />
  }

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


