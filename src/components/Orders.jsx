import React, { useState, useEffect } from "react";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const config = {
      headers: { token: token },
    };

    axios
      .get("https://ahmed-samy-node-project-iti.onrender.com/order", config)
      .then((response) => {
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="card mb-3">
            <div className="card-header">Order ID: {order._id}</div>
            <div className="card-body">
              <h5 className="card-title">Status: {order.status}</h5>
              <p className="card-text">Total Amount: ${order.totalAmount}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                Delivery Address:{" "}
                {`${order.address.street}, ${order.address.city}, ${order.address.country}`}
              </p>
              <h6>Products:</h6>
              <ul>
                {order.products.map((product) => (
                  <li key={product._id}>
                    {product.productId.productName} - Quantity:{" "}
                    {product.quantity} - Price: ${product.productId.finalPrice}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
