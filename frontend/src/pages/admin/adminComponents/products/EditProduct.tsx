import React, { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Label from "../../../../components/Label";
import { update } from "../../../../slice/productSlice";

interface props {
  handleEdit: () => void;
  id: string;
}

const EditProduct = ({ handleEdit, id }: props) => {
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string>("hamburger");
  const description = useRef<HTMLInputElement>(null);
  const off = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>();
  const [showCategory, setShowCategory] = useState(false);
  const dispatch = useDispatch<any>();

  const handleImage = (e: any) => {
    const img = e.target.files[0];
    setImage(img);
  };
  const handleCreate = () => {
    const form = new FormData();
    if (name.current !== null) form.append("name", name.current.value);
    if (price.current !== null) form.append("price", price.current.value);
    form.append("category", category);
    if (description.current !== null)
      form.append("description", description.current.value);
    form.append("image", image);
    if (off.current !== null) form.append("off", off.current.value);
    form.append("id", id);
    dispatch(update(form));
  };

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 z-10 bg-black w-full h-full bg-opacity-40">
      <div className="flex flex-col gap-2 w-3/4 md:w-1/2 lg:w-2/6 rounded-md p-6  bg-zinc-800">
        <Label name="Name" />
        <input
          className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white  "
          ref={name}
          placeholder="example"
        />
        <Label name="Category" />
        <div className="relative">
          <input
            className="bg-zinc-900 rounded-md w-full cursor-pointer  h-9 outline-none p-5 text-white  "
            value={category}
            placeholder="example"
            onClick={() => setShowCategory(showCategory ? false : true)}
            readOnly
          />
          <FaAngleDown className="absolute top-2 cursor-pointer right-4 text-2xl" />
          {showCategory && (
            <ul className="absolute bg-zinc-900 w-full mt-2 rounded-md p-2">
              <li
                className="p-1 cursor-pointer"
                onClick={() => (setCategory("hamburger"))}
              >
                Hamburger
              </li>
              <li
                className="p-1 cursor-pointer"
                onClick={() => (setCategory("pizza"))}
              >
                Pizza
              </li>
              <li
                className="p-1 cursor-pointer"
                onClick={() => (setCategory("cake"))}
              >
                cake
              </li>
              <li
                className="p-1 cursor-pointer"
                onClick={() => (setCategory("icecream"))}
              >
                Ice cream
              </li>
              <li
                className="p-1 cursor-pointer"
                onClick={() => (setCategory("tacos"))}
              >
                Tacos
              </li>
            </ul>
          )}
        </div>
        <Label name="Price" />
        <input
          className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white  "
          ref={price}
          placeholder="example"
        />
        <Label name="Description" />
        <input
          className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white  "
          ref={description}
          placeholder="example"
        />
        <Label name="Off" />
        <input
          className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white  "
          ref={off}
          placeholder="example"
        />
        <div className="mt-5 ">
          <label
            htmlFor="image"
            className="bg-opacity-0 border   rounded-md text-violet border-violet h-10 px-5 py-2 cursor-pointer"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            className=" hidden "
            onChange={(e) => handleImage(e)}
          />
        </div>
        <div className="flex gap-1 items-center mt-10">
          <button
            className="bg-violet self-center  w-1/2  border  rounded-md text-white border-violet h-10"
            onClick={() => handleCreate()}
          >
            Save
          </button>
          <button
            onClick={() => handleEdit()}
            className="w-1/2 bg-transparent border-violet border p-2 rounded-md"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
