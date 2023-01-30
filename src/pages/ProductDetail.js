import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const ProductDetail = () => {
    const [product,setProduct] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [quantity,setQuantity] = useState(1)

    useEffect(()=>{
        axios.get(window.location.pathname)
             .then(response=>{
                setProduct(response.data)
                setIsLoading(false)
            })
             .catch(error=>console.log(error))
    },[])

    function handleQuantity(e){
        setQuantity(e.target.value)
    }
    function handleAdd(e){

    }

    function totalPrice(){
        return quantity * product.price
    }

    

  return (
    (isLoading===true)?<></>:(<div className="columns" style={{marginTop:"5rem",}}>
    <div className="column is-6">
        <figure className="image">
            <img src={product.images[0].image} alt='' />
        </figure>
    </div>
    <div className="column is-6">
        <h1 className="title">{ product.title }</h1>
        <p className="subtitle is-size-6"  dangerouslySetInnerHTML={{ __html: product.description }}></p>
        <div className="box">
            <h2 className="subtitle">Information</h2>
            <p><strong>Price: </strong>$ { totalPrice().toFixed(2) }</p>
            <div className="field">
                <label>Quantity</label>
                <div className="control mb-4">
                    <input type="number" className="input" name="quantity" value={quantity} onChange={(e)=>{handleQuantity(e)}} min="1" />
                </div>
                <div className="control">
                    <button className="button is-dark" onClick={(e)=>{handleAdd(e)}}>Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</div>)
  )
}

export default ProductDetail