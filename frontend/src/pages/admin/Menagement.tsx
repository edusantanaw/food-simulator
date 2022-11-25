import Orders from "./adminComponents/products/Orders";
import Products from "./adminComponents/products/Products";

const Menagement = () => {
  return (
    <div className="p-28  text-white">
      <div>
        <h2 className="text-4xl">Menagement</h2>
      </div>
      <Orders />
      <Products />
    </div>
  );
};

export default Menagement;
