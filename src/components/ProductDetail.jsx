import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ProductDetail() {
  let { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ahmed-samy-node-project-iti.onrender.com/product/${productId}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    const token = getCookie("token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(
        "https://ahmed-samy-node-project-iti.onrender.com/cart",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            products: [
              {
                productId: productId,
                quantity: 1,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Server Error Response:", errorBody);
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();
      console.log("Server Response:", data);
      alert("Item added to cart successfully");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert(error.message);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="product-detail">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.imageURL}
              alt={product.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.productName}</h2>
            <p className="text-muted">Description: {product.description}</p>
            <p className="fw-bold">Price: ${product.finalPrice}</p>

            <div className="mt-4">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
