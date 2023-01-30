import React from 'react'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
import { CartItem } from '../components/CartItem'
const Cart = () => {
    const {cart} = useContext(CartContext)

    const cartTable = cart.items.map(item=>
        <CartItem
                        key="item.product.id" 
                        initialItem={item}
                        deleteOption={true}
                        />
    )
    function cartTotalLength(){
        return cart.items.reduce((acc,curVal)=>{
            return acc += curVal.quantity
        },0)
    }

    function CartTotalPrice(){
        return cart.items.reduce((acc,curVal)=>{
            return acc += curVal.quantity * curVal.product.price
        },0)
    }
  return (
    <>
    <div className="column is-10 is-offset-1 mt-6 columns is-multiline">
            <div className="column is-12">
                <h1 className="title">
                    Cart
                </h1>
            </div>

            <div className="column is-12 box">
                {cartTotalLength()?<table className="table is-fullwidth" v-if="cartTotalLength">
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
            {cartTotalLength()?
            <div className="column is-12 box">
                <h2 className="subtitle">Summary</h2>
                <strong>$ { CartTotalPrice().toFixed(2) }</strong>, { cartTotalLength() } items.
                <hr />
                <a href="/cart/checkout" className="button is-dark">Procced to Checkout</a>
            </div>:null}

        </div>
    </>
  )
}


export default Cart