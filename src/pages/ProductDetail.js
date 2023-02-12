import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useEffect } from 'react'
import axiosInstance from '../axios'
import { toast } from 'bulma-toast'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const ProductDetail = () => {
    const navigate = useNavigate()
    const [product,setProduct] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [quantity,setQuantity] = useState(1)
    const {addToCart} = useContext(CartContext)
    const {isAuthenticated} = useContext(AuthContext)
    useEffect(()=>{
        axiosInstance.get(window.location.pathname)
             .then(response=>{
                setProduct(response.data)
                setIsLoading(false)
                document.title = product.title
            })
             .catch(error=>console.log(error))
    },[])

    function handleQuantity(e){
        if (isNaN(e.target.value) || e.target.value<=0){
            setQuantity(1)
        }else{
            setQuantity(parseInt(e.target.value))
        }
    }
    function handleAdd(e){
        e.target.disabled = true
        if (isAuthenticated){
        axiosInstance.post('/cart/add-to-cart/',{"product":product.title,"quantity":quantity})
        .then(response=>{
            addToCart({product,quantity})
            toast({
                message:"Added to cart",
                position:'bottom-right',
                dismissible:true,
                pauseOnHover:true,
                type:'is-success',
                duration:1500
            })
        }).catch(error=>{
            toast({
                message:JSON.stringify(error.response.data),
                position:'bottom-right',
                dismissible:true,
                pauseOnHover:true,
                type:'is-danger',
                duration:1500
            })
        })}else{
            navigate('/login',{})
        }
        setInterval(()=>{
            e.target.disabled = false
        },1000)
    }

    function totalPrice(){
        return quantity * product.price
    }
    function description(text){
        let el = document.createElement('p')
        el.innerHTML = text
        return el.childNodes[0].nodeValue
    }


  return (
    (isLoading===true)?<></>:(<div className="column is-10 is-offset-1 columns" style={{marginTop:"5rem",}}>
    <div className="column is-6">
        <figure className="image">
            <img src={product.images[0].image} alt='' />
        </figure>
    </div>
    <div className="column is-6">
        <h1 className="title has-text-centered">{ product.title }</h1>
        <table className='is-fullwidth table'>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody className=''>
                {product.specs.map(spec=>(
                    <tr key={spec.title} className=''>
                        <td className=''>{spec.title}</td>
                        <td className=''>{spec.desc}</td>
                    </tr>
                ))}
            </tbody>
        </table>
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