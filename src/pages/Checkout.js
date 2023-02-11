import axiosInstance from "../axios"
import {CartItem} from '../components/CartItem'
import { useState,useContext } from "react"
import { CartContext } from "../context/CartContext"
import axios from "axios"
const Checkout = () => {
  const {cart} = useContext(CartContext)
  const [first_name,setFirstName] = useState('')
  const [last_name,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [zipcode,setZIPCode] = useState('')
  const [address,setAddress] = useState('')
  const [place,setPlace] = useState('')
  const [phone,setPhone] = useState('')
  const [info,setInfo] = useState(true)
  const [paymentChoice,setChoice] = useState(true)
  const [useStripe,setStripeChoice] = useState(false)
  const [stripe,setStripe] = useState({})
  const [card,setCard] = useState(<></>)
  

  const tableItems = cart.items.map(item=>(
    <CartItem initialItem={item} key={item.product.title} deleteOption={false} />
  ))


  function handleShiping(e){
    e.preventDefault()
    setInfo(false)
  }

  function payWithPaymob(){
    axiosInstance.post('/checkout/paymob/',{
      first_name,
      last_name,
      email,
      address,
      zipcode,
      place,
      phone
    }).then(response=>{
      const token = response.data.payment_token
      window.location.assign(`https://accept.paymob.com/api/acceptance/iframes/648418?payment_token=${token}`)
    }).catch(error=>{
      console.log(error)
    })
  }

  return (
    <>
    <div className="columns is-multiline column is-10 is-offset-1 mt-6 box">
      <div className="column is-12">
        <h2 className="title">Checkout</h2>
      </div>
      <div className="column is-12">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {tableItems}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td></td>
              <td>${cart.total_price.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    {info?<div className="column is-10 is-offset-1 columns box mt-3">
      <form className="columns is-multiline" onSubmit={(e)=>{handleShiping(e)}}>
        <div className="column is-12">
          <h1 className="title">
            Shipping Details
          </h1>
          <p className="is-size-7">All fields are required.</p>
        </div>
        <div className="column is-half field">
          <label htmlFor="first_name">First Name</label>
          <div className="control">
            <input type="text" id="first_name" name="first_name" className="input"
             value={first_name}
             onChange={(e)=>{setFirstName(e.target.value)}}
             required />
          </div>
        </div>
        <div className="column is-half field">
          <label htmlFor="last_name">Last Name</label>
          <div className="control">
            <input type="text" id="last_name" name="last_name" className="input"
              value={last_name}
              onChange={(e)=>{setLastName(e.target.value)}}
             required />
          </div>
        </div>
        <div className="column is-half field">
          <label htmlFor="email">Email address</label>
          <div className="control">
            <input type="email" id="email" name="email" className="input"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            required />
          </div>
        </div>
        <div className="column is-half field">
          <label htmlFor="address">Address</label>
          <div className="control">
            <input type="text" id="address" name="address" className="input"
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}
            required />
          </div>
        </div>
        <div className="column is-half field">
          <label htmlFor="zipcode">ZIP code</label>
          <div className="control">
            <input type="text" id="zipcode" name="zipcode" className="input"
            value={zipcode}
            onChange={(e)=>{setZIPCode(e.target.value)}}
            required />
          </div>
        </div>
        <div className="column is-half field">
          <label htmlFor="place">Place</label>
          <div className="control">
            <input type="text" id="place" name="place" className="input"
            value={place}
            onChange={(e)=>{setPlace(e.target.value)}}
            required />
          </div>
        </div>
        <div className="column is-half field">
          <label htmlFor="phone">Phone number</label>
          <div className="control">
            <input type="tel" id="phone" name="phone" className="input"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            required />
          </div>
        </div>
        <div className="column is-12"><button className="button is-info">Submit Info</button></div>
      </form>
    </div>:
    <div className="columns is-multiline column is-10 is-offset-1 box mt-3">
      <div className="column is-half">
        <h1 className="subtitle">First Name: {first_name}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Last Name: {last_name}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Email address: {email}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Address: {address}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Place: {place}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">ZIP code: {zipcode}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Phone: {phone}</h1>
      </div>
      <div className="column is-12"><button className="button is-success" onClick={()=>{payWithPaymob()}}>Pay with Paymob</button></div>
      </div>}
    </>
  )
}
export default Checkout