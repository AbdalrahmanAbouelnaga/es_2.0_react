import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ProductBox } from '../components/ProductBox'
import axios from 'axios'
const ProductList = () => {
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState('')
    const [subcategory,setSubCategory] = useState('')


    useEffect(()=>{
        axios.get(window.location.pathname)
             .then(response=>{
                setProducts(response.data.products)
                setCategory(response.data.category)
                setSubCategory(response.data.title)
             }).catch(error=>{
                console.log(error)
             })
    },[])

    let productBoxes = products.map(product=>{
        return <ProductBox product={product} key={product.id} />
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