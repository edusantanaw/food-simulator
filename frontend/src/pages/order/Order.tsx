import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useApi } from "../../hooks/useApi";

const Order = () => {
  const params = useParams();
  const { data, loading, error } = useApi(`/order/${params.id}`);

  if (loading) return <Loader />;
  return (
    <div className="p-28 text-white">
      <h2 className="text-3xl pb-4">Order</h2>
      <ul className="flex flex-col gap-5">
        {data ? (
          data.map((prod: any, i: number) => (
            <li
              key={i}
              className={`border list-none p-3 ${
                prod.status === "denied"
                  ? "border-red-800"
                  : prod.status === "accepted"
                  ? "border-green-600"
                  : "border-blue-800"
              }`}
            >
              <div>
                <span className="pr-2">Number: {prod.numberOrder}</span>
                <span>status: {prod.status}</span>
              </div>
            </li>
          ))
        ) : (
          <span>No products found!</span>
        )}
      </ul>
    </div>
  );
};

export default Order;
