import React from 'react'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
import axiosInstance from '../axios'
export const CartItem = ({initialItem,deleteOption}) => {
    const item = initialItem
    const {addToCart,decrementItem,removeFromCart} = useContext(CartContext)
    async function handleDecrementItem(item){
        if (item.quantity>1){
        await decrementItem({product:item.product,quantity:1})
        axiosInstance.post('/cart/change-item-quantity/',{"product":item.product.title,"quantity":item.quantity-1})
            .then(res=>console.log(res))
            .catch(error=>console.log(error))
        }else{
            removeFromCart(item.product.id)
            axiosInstance.post('/cart/remove-from-cart/',{"product":item.product.title})
                    .then(res => console.log(res))
                    .catch(error=>console.log(error))
        }
    }
    async function handleIncrementItem(item){
        await addToCart({product:item.product,quantity:1})
        axiosInstance.post('/cart/change-item-quantity/',{"product":item.product.title,"quantity":item.quantity+1})
            .then(res=>console.log(res))
            .catch(error=>console.log(error))
    }
    async function handleRemoveFromCart(item){
        removeFromCart(item.product.id)
        axiosInstance.post('/cart/remove-from-cart/',{"product":item.product.title})
                    .then(res => console.log(res))
                    .catch(error=>console.log(error))

    }
    function itemTotalPrice(item){
        return item.quantity*item.product.price
    }
  return (
    <tr>
        <td><a href={item.product.url}>{ item.product.title }</a></td>
        <td>${ item.product.price }</td>
        <td>
            { item.quantity }
            {deleteOption?<><a onClick={()=>{handleDecrementItem(item)}}>-</a>
            <a onClick={()=>{handleIncrementItem(item)}}>+</a></>:null}
        </td>
        <td>${ itemTotalPrice(item).toFixed(2) }</td>
        {deleteOption?<td><button className="delete"  onClick={()=>{handleRemoveFromCart(item)}}></button></td>:null}
    </tr>
  )
}
