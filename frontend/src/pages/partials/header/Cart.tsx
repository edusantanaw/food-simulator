import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { removeToCart, clearCart } from "../../../slice/cartSlice";
import { AiOutlineClose } from "react-icons/ai";
import { IoBasket } from "react-icons/io5";
import { order } from "../../../slice/productSlice";

interface cart {
  cart: {
    products: [];
  };
}

interface product {
  name: string;
  _id: string;
  quantity: 0;
  image: [
    {
      filename: string;
    }
  ];
}

interface func {
  handleBasket: () => void;
}

const Cart = ({ handleBasket }: func) => {
  const [productToOrder, setProducts] = React.useState<string[]>();
  const dispatch = useDispatch();
  const prod: any = useSelector<cart>((state) => state.cart.products);
  const [tot, setTot] = React.useState<number>(0);
  localStorage.setItem("@App:cart", JSON.stringify(prod));

  const handleRemove = (prod: product) => {
    dispatch<any>(removeToCart(prod._id));
  };

  React.useEffect(() => {
    const products = prod.map(
      (product: any) =>
        (product = { prod: product._id, quantity: product.quantity })
    );
    const total = prod.reduce((m: number, product: any) => {
      if (product.off > 0)
        return (
          m +
          (product.price - product.price * product.off) *
            (product.quantity ? product.quantity : 1)
        );
      if (product.quantity === undefined) return (m += product.price);
      return (m += product.price * product.quantity);
    }, 0);

    setProducts(products);
    setTot(total.toFixed(2));
  }, [prod]);

  const handleOrder = () => {
    if (productToOrder) {
      dispatch<any>(order(productToOrder));
      dispatch<any>(clearCart());
      localStorage.removeItem("@App:cart");
    }
  };

  return (
    <div className=" fixed top-0 left-0 w-full h-screen z-30">
      <div onClick={() => handleBasket()} className="w-full h-screen "></div>
      <div className="w-3/4 md:w-1/2 lg:w-1/3   h-screen absolute bg-black bg-opacity-90 top-0 right-0 z-10 shadow-sm shadow-white text-white cursor-default">
        <div className="w-full mb-2 p-3  rounded-b-md  flex items-center justify-between bg-violet  ">
          <AiOutlineClose
            className="text-2xl cursor-pointer"
            onClick={() => handleBasket()}
          />
          <h2>Cart</h2>
          <IoBasket className="text-2xl" />
        </div>
        <ul className="p-2 flex flex-col gap-3 ">
          {prod.length > 0 ? (
            prod.map((prod: product, i: number) => (
              <li
                key={i}
                className="flex relative items-center cursor-pointer "
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="h-10 w-10 object-cover rounded-md"
                    src={`http://localhost:5000/products/${prod.image[0]?.filename}`}
                    alt="product image"
                  />
                  <span>{prod.name}</span>
                  <span>{prod.quantity}</span>
                </div>
                <FaTrashAlt
                  className="absolute right-0 text-red-800 cursor-pointer"
                  onClick={() => handleRemove(prod)}
                />{" "}
              </li>
            ))
          ) : (
            <span className="text-center">cesta vazia</span>
          )}
        </ul>
        <div className="absolute bottom-0 w-full flex flex-col  ">
          <span className="text-xl self-center p-1">Total: R${tot}</span>
          <button
            onClick={() => handleOrder()}
            className=" bg-violet w-full h-12 rounded-t-md "
          >
            Finalize order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
