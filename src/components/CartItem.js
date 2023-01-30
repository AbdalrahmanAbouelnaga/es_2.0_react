import React from 'react'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
export const CartItem = ({initialItem,deleteOption}) => {
    const item = initialItem
    const {addToCart,decrementItem,removeFromCart} = useContext(CartContext)
    function handleDecrementItem(item){
        decrementItem({product:item.product,quantity:1})
    }
    function handleIncrementItem(item){
        addToCart({product:item.product,quantity:1})
    }
    function handleRemoveFromCart(item){
        removeFromCart(item.product.id)
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
