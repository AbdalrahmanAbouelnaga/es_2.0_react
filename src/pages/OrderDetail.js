import { useState,useEffect } from "react"
import axiosInstance from "../axios"


const OrderDetail = () => {
    const [order,setOrder] = useState({})
    
    useEffect(()=>{
        axiosInstance.get(window.location.pathname)
                    .then(response=>setOrder(response.data))
                    .catch(error=>console.log(error))
        document.title = `Order ${order.order_id}`
    },[])

    const tableItems = order.items?order.items.map(item=>(
        <tr>
            <td>{item.product}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
        </tr>
      )):null
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
              <td>${order.paid_amount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <div className="columns is-multiline column is-10 is-offset-1 box mt-3">
      <div className="column is-half">
        <h1 className="subtitle">First Name: {order.first_name}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Last Name: {order.last_name}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Email address: {order.email}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Address: {order.address}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Place: {order.place}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">ZIP code: {order.zipcode}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Phone: {order.phone}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Payment Status: {order.payment_status}</h1>
      </div>
      <div className="column is-half">
        <h1 className="subtitle">Order Status: {order.status}</h1>
      </div>
      </div>
    </>
  )
}

export default OrderDetail