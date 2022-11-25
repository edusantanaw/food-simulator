import React from "react";
import { useDispatch } from "react-redux";
import { List } from "../../../../components/List";
import Loader from "../../../../components/Loader";
import { Message } from "../../../../components/Message";
import { useApi } from "../../../../hooks/useApi";
import { selectMsg, updateStatus } from "../../../../slice/productSlice";

const Orders = () => {
  const [update, setUpdate] = React.useState("");
  const { data, loading } = useApi("/orders", update);
  const dispatch = useDispatch();

  const handleStatus = (n: number, id: string) => {
    const obj = {
      status: n === 1 ? true : false,
      id: id,
    };
    dispatch<any>(updateStatus(obj));

    setUpdate("update with  success");
    setTimeout(() => {
      setUpdate("");
    }, 2000);
  };

  if (loading) return <Loader />;

  return (
    <div className="mt-5">
      {update.length > 0 && <Message msg={update} />}
      <h3 className="text-3xl mb-6">Orders</h3>
      <ul className="flex flex-col gap-4">
        <List
          data={ data}
          handleStatus={handleStatus}
        />
      </ul>
    </div>
  );
};

export default Orders;
