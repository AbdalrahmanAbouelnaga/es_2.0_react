import { useEffect, useState,useContext } from 'react';
import axiosInstance from '../axios';
import { ProductBox } from '../components/ProductBox';
import { AuthContext } from '../context/AuthContext';

function App() {
  const [products,setProducts] = useState([])
  const {isAuthenticated} = useContext(AuthContext)
  
  useEffect(()=>{
  if (isAuthenticated){
    axiosInstance.get('/cart/')
    .then(res=>sessionStorage.setItem('cart',JSON.stringify(res.data)))
    .catch(error=>console.log(error))
  }
},[])
  useEffect(()=>{
    axiosInstance.get('/latest-products')
         .then(response=>{
          setProducts(response.data)
         }).catch(error=>console.log(error))
  },[])

  let productBoxes = products.map(product=>{
    return <ProductBox product={product} key={product.title} />
  })


  return (
    <>
        <div className="column is-12">
          <div className="hero">
            <div className="hero-body has-text-centered">
              <p className="title">Latest Products</p>
            </div>
          </div>
          <div className="column is-10 is-offset-1 custom-gap columns">
            {productBoxes}
            </div>
        </div>
    </>
  );
}

export default App;
