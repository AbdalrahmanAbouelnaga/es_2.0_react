import { useState,useEffect } from "react"
import axiosInstance from "../axios"
const OrderList = () => {
    const [orders,setOrders] = useState({})

    useEffect(()=>{
        axiosInstance.get('/orders/')
                    .then(response=>setOrders(response.data))
                    .catch(error=>console.log(error))
        document.title = "Order List"
    },[])

    const orderList = orders.length?orders.map(order=>(
        <div className="card mt-3">
            <a href={order.url}>
                <div className="card-content">
                    <div className="title">Order {order.order_id}</div>
                    <hr />
                    <div className="subtitle columns is-multiline">
                        <span className="column is-half">Total Price: ${order.paid_amount}</span>
                        <span className="column is-half">Payment Status: {order.payment_status}</span>
                        <span className="column is-half">Order Status: {order.status}</span>
                    </div>
                </div>
            </a>
        </div>
    )):<p className="box p-3">You haven't ordered anything yet...</p>
    return (
    <div className="column is-8 is-offset-2 mt-6">
        {orderList}
    </div>
  )
}


export default OrderList