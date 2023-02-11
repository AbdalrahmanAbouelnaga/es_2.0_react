import React, { useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
import { CartItem } from '../components/CartItem'
const Cart = () => {
    const {cart} = useContext(CartContext)
    
    const cartTable = cart.items?cart.items.map(item=>
        <CartItem
                        key="item.product.id" 
                        initialItem={item}
                        deleteOption={true}
                        />
    ):null
  return (
    <>
    <div className="column is-10 is-offset-1 mt-6 columns is-multiline">
            <div className="column is-12">
                <h1 className="title">
                    Cart
                </h1>
            </div>

            <div className="column is-12 box">
                {cart.number_of_items?<table className="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartTable}
                    </tbody>
                </table>:
                <p>You don't have any products in the cart yet...</p>}
            </div>
            {cart.number_of_items?
            <div className="column is-12 box">
                <h2 className="subtitle">Summary</h2>
                <strong>$ { cart.total_price }</strong>, { cart.number_of_items } items.
                <hr />
                <a href="/cart/checkout" className="button is-dark">Procced to Checkout</a>
            </div>:null}

        </div>
    </>
  )
}


export default Cart