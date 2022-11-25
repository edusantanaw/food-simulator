import React from "react";
import Products from "../home/homeComponents/Products";

interface product {
  name: string;
  _id: string;
  category: string;
  image: [
    {
      filename: string;
    }
  ];
}


const Deals = () => {
  return (
    <div className="p-28 text-white">
      <h2 className="text-4xl">Deals</h2>
     <Products url="/products/deals" />
    </div>
  );
};

export default Deals;
