import React from "react";

const ProductList = () => {
  const products = [
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Phone", price: 30000 },
  ];

  const handleAddToCart = (product) => {
    console.log(`Emitting add-to-cart event for product ID: ${product.id}`);
    console.log("Window object before dispatch:", window);

    const customEvent = new CustomEvent('add-to-cart', {
      detail: product,
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(customEvent);
  };

  return (
    <div style={{
      border: "1px solid #ccc", // Replace with your desired border style
      padding: "16px",          // Replace with your desired padding
      margin: "16px",           // Replace with your desired margin
      backgroundColor: "#f9f9f9" // Replace with your desired background color
    }}>
      <h2>Product Catalog</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ₹{product.price.toLocaleString()}{" "}
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;