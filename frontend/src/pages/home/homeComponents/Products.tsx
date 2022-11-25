import React, { lazy } from "react";
import { useApi } from "../../../hooks/useApi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { addToCart } from "../../../slice/cartSlice";
import Loader from "../../../components/Loader";
const Details = lazy(() => import("../../details/Details"));

type params = {
  url: string;
};

const Products = ({ url }: params) => {
  const { data, loading, error } = useApi(url);
  const [details, setShowDetails] = React.useState<boolean>(false);
  const [detailsId, setDetailsId] = React.useState<string>('gdxzc');
  const dispatch = useDispatch();

  const handleShowDetails = (id: string) => {
    setDetailsId(id);
    setShowDetails(true);
  };
  const addCard = (product: string) => {
    dispatch(addToCart(product));
  };

  const close = () => {
    setShowDetails(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="text-white mt-12">
      <ul className="flex justify-center lg:justify-start gap-x-8 flex-wrap ">
        {data ? (
          data.map((products: any, i) => (
            <li
              className=" w-96 h-96 sm:w-64 mr-px sm:h-64 mb-12 bg-zinc-900 rounded-md"
              key={i}
            >
              <img
                onClick={() => handleShowDetails(products._id)}
                loading="lazy"
                className="w-full object-cover h-4/6 cursor-pointer rounded-t-md"
                src={`http://localhost:5000/products/${products.image[0]?.filename}`}
                alt="product image"
              />
              <div className="flex p-2 items-center justify-between">
                <div>
                  <h3
                    onClick={() => handleShowDetails(products._id)}
                    className="font-medium text-2xl text-violet cursor-pointer"
                  >
                    {products.name}
                  </h3>
                  <div className="flex gap-2">
                <span className={`${products.off && "line-through text-red-700"}`}>
                  R${products.price}
                </span>
                {products.off > 0 && (
                  <span>to R${products.price - products.off * products.price}</span>
                )}
              </div>
                </div>
                <BsFillCartPlusFill
                  onClick={() => addCard(products)}
                  className="text-violet p-1  cursor-pointer rounded-sm text-3xl"
                />
              </div>
            </li>
          ))
        ) : (
          <span>products not find</span>
        )}
      </ul>
      {details && (
        <Details id={detailsId} addCard={addCard} showDetails={close} />
      )}
    </div>
  );
};

export default Products;
