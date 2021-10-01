import "./products.css";
import { useState, useEffect } from "react";

export default function Products({ name, model, price }) {
  //   {name}
  // {model}
  // {price}
  return (
    <div className="Products">
      <div className="product_container">
        <div className="product_container_image">
          <img alt="image"></img>
        </div>
        <div className="product_container_details">
          {name}
          <br></br>
          {model}
          <br></br>
          {price}
          <br></br>
        </div>
      </div>
    </div>
  );
}
