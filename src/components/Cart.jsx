import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const token = getCookie("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const config = {
      headers: { token: token },
    };

    axios
      .get("https://ahmed-samy-node-project-iti.onrender.com/cart", config)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const handleOrder = () => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const token = getCookie("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const config = {
      headers: { token: token },
    };

    const orderDetails = {
      paymentMethod: "cashOnDelivery",
    };

    axios
      .post(
        "https://ahmed-samy-node-project-iti.onrender.com/order",
        orderDetails,
        config
      )
      .then((response) => {
        console.log("Order placed successfully", response.data);
        navigate("/order"); 

      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("There was an error placing your order. Please try again.");
      });
  };

  if (!cart) return <div>Loading cart...</div>;

  return (
    <div>
      <h2 className="my-4">Your Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Final Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.productId.imageURL}
                  alt={item.productId.productName}
                  style={{ width: "50px", marginRight: "10px" }}
                />
                {item.productId.productName}
              </td>
              <td>{item.quantity}</td>
              <td>${item.productId.finalPrice}</td>
              <td>${item.quantity * item.productId.finalPrice}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="text-end">
              Total Cart Final Price:
            </td>
            <td>${cart.priceAfterDiscount}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-success" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Cart;
