import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductBox } from '../components/ProductBox';


function App() {
  const [products,setProducts] = useState([])
  useEffect(()=>{
    axios.get('/latestProducts')
         .then(response=>{
          setProducts(response.data)
         }).catch(error=>console.log(error))
  },[])

  let productBoxes = products.map(product=>{
    return <ProductBox product={product} key={product.id} />
  })
  useEffect(()=>{
    productBoxes = products.map(product=>{
      return <ProductBox product={product} key={product.id} />
    })
  },[products])

  return (
    <>
        <div className="column is-12">
          <div className="hero">
            <div className="hero-body has-text-centered">
              <p className="title">Latest Products</p>
            </div>
          </div>
          <div className="column is-10 is-offset-1 columns" style={{gap:'1rem'}}>
            {productBoxes}
            </div>
        </div>
    </>
  );
}

export default App;
