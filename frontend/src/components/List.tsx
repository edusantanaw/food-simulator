import React from "react";

interface listProps {
  data: object[];
  handleStatus: (n: number, id: any) => void;
}
export const List = ({ data, handleStatus }: listProps) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((prod: any, i) => (
          <li
            className="list-none flex justify-between items-center border border-violet p-3 rounded-md"
            key={i}
          >
            <div>
              <h4 className="text-violet text-xl">ClientId: {prod.client}</h4>
              <span>
                {prod.product.map((prod: any, i: number) => (
                  <div className="flex gap-2" key={i}>
                    <span>Product: {prod.product.name},</span>
                    <span>quantity : {prod.quantity}</span>
                  </div>
                ))}
              </span>
            </div>
            <div>
              <button
                className="border rounded-sm mr-5 border-violet text-violet px-8 py-2"
                onClick={() => handleStatus(1, prod._id)}
              >
                Accept
              </button>
              <button
                onClick={() => handleStatus(0, prod._id)}
                className="border rounded-sm border-red-700 text-red-700 px-8 py-2"
              >
                Decline
              </button>
            </div>
          </li>
        ))
      ) : (
        <span>No products found!</span>
      )}
    </>
  );
};
