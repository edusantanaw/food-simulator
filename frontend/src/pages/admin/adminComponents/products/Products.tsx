import React from "react";
import { useApi } from "../../../../hooks/useApi";
import NewProduct from "./NewProduct";
import { FaEdit } from "react-icons/fa";
import EditProduct from "./EditProduct";
import Loader from "../../../../components/Loader";

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

const Products = () => {
  const [newProduct, setNewProduct] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const { data, error, loading } = useApi("/products");
  const [id, setId] = React.useState<string>("");
  const handleProduct = () => {
    setNewProduct(newProduct ? false : true);
  };

  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true);
  };
  if(loading) return <Loader />

  return (
    <div className="mt-10">
      {edit && <EditProduct id={id} handleEdit={handleEdit} />}
      {newProduct && <NewProduct handleProduct={handleProduct} />}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-3xl mb-3">Products</h3>
        <button
          className="px-10 py-3 bg-violet rounded-md font-medium"
          onClick={() => handleProduct()}
        >
          New product
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {data ?
          data.map((prod: any , i: number) => (
            <li
              className="list-none border border-violet rounded-md flex  relative p-2"
              key={i}
            >
              <div className="flex flex-col ">
                <h4 className="text-2xl text-violet">Name: {prod.name}</h4>
                <span>Category: {prod.category}</span>
                <span>id: {prod._id}</span>
              </div>
              <FaEdit
                onClick={() =>{
                     handleEdit()
                     setId(prod._id)
                }}
                className="absolute right-6 top-9 text-2xl text-blue-700"
              />
            </li>
          )):<span className="text-white">products not find</span>}
      </ul>
    </div>
  );
};

export default Products;
