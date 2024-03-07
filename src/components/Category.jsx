import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductsByCategory = (categoryName) => {
    fetch(
      `https://ahmed-samy-node-project-iti.onrender.com/product/category/${encodeURIComponent(
        categoryName
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProductsByCategory(categoryName);
  }, [categoryName]);

  const handleAddToCart = async (productId) => {
    const token = getCookie("token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.patch(
        "https://ahmed-samy-node-project-iti.onrender.com/cart",
        {
          products: [{ productId: productId, quantity: 1 }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.status === 200) {
        alert("Item added to cart successfully");
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container py-5 mb-5">
        <div className="row">
          {loading ? (
            <div className="col-12 text-center">
              <FontAwesomeIcon icon={faSpinner} spin className="fa-3x" />
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.imageURL}
                      className="card-img-top product-img"
                      alt={product.productName}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">Price: ${product.finalPrice}</p>
                    <p className="card-text">Stock: {product.stock}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
