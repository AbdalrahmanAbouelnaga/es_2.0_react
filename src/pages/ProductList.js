import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ProductBox } from '../components/ProductBox'
import axiosInstance from '../axios'
const ProductList = () => {
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState('')
    const [subcategory,setSubCategory] = useState('')


    useEffect(()=>{
        axiosInstance.get(window.location.pathname)
             .then(response=>{
                setProducts(response.data)
             }).catch(error=>{
                console.log(error)
             })
    },[])

    let productBoxes = products.map(product=>{
        return <ProductBox product={product} key={product.title} />
      })

    
  return (
    <>
        <div className="column is-12">
          <div className="hero">
            <div className="hero-body has-text-centered">
              <p className="title">{category}</p>
              <p className="subtitle">{subcategory}</p>
            </div>
          </div>
          <div className="column is-10 is-offset-1 custom-gap columns">
            {products.length?productBoxes:<p className='column is-12 subtitle has-text-centered'>Sorry, We're out of {subcategory} products</p>}
            </div>
        </div>
    </>
  )
}




export default ProductList