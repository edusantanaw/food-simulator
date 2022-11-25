import { IoBasket } from "react-icons/io5";
import Loader from "../../components/Loader";
import { useApi } from "../../hooks/useApi";

interface id {
  id: string;
  showDetails: () => void;
  addCard: (product: string) => void;
}

const Details = ({ id, showDetails, addCard }: id) => {
  const { data, error, loading } = useApi(`/products/${id}`);

  if (loading) return <Loader />;

  return (
    <div className="fixed left-0 flex justify-center items-center top-0 z-20 bg-black bg-opacity-50 w-full h-screen  text-white">
      <div onClick={() => showDetails()} className="absolute top-0 left-0 w-full h-screen"></div>
      {data &&
        data.map((prod: any, i:number) => (
          <div key={i} className="flex z-10 rounded-md shadow-sm shadow-slate-300 flex-col w-3/4 md:w-1/2 lg:w-1/3 p-6 bg-black mt-10 ">
            <img
              alt="product image"
              className="rounded-md object-cover w-full h-80 self-center"
              src={`http://localhost:5000/products/${prod.image[0]?.filename}`}
            />
            <div className="flex flex-col pt-3">
              <h2 className="text-4xl text-violet">{prod.name}</h2>
              <div className="flex gap-2">
                <span className={`${prod.off && "line-through text-red-700"}`}>
                  R${prod.price}
                </span>
                {prod.off > 0 && (
                  <span>to R${prod.price - prod.off * prod.price}</span>
                )}
              </div>
              <span>Description:</span>
              <p>{prod.description}</p>
              <button
                onClick={() => addCard(prod)}
                className="bottom-0 mt-10 flex items-center p-4 justify-between  bg-violet w-full h-12 rounded-md "
              >
                Add to cart
                <IoBasket className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Details;
