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



import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

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
  },
  {
    path:"/categories/:category_slug/subcategories/:subcategory_slug",
    element:<ProductList />
  },
  {
    path:"/categories/:category_slug/subcategories/:subcategory_slug/products/:product",
    element: <ProductDetail />
  },
  {
    path:"/cart",
    element:<Cart />
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


