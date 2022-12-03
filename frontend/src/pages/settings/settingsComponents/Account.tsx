import React from "react";
import Label from "../../../components/Label";
import { useDispatch } from "react-redux";
import { logout, update } from "../../../slice/userSlice";
import imgDefault from "../../../assets/perfilDefault.jpg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const user = JSON.parse(localStorage.getItem("@App:user") || "{}");
const token = localStorage.getItem("@App:token");

const address = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(5, "must have more than 4 caracters"),
  lastName: yup
    .string()
    .required("First name is required")
    .min(5, "must have more than 4 caracters"),
  email: yup.string().required("Email is required").email(),
  phoneNumber: yup.number().typeError('Must be a number').min(9, "Must have more than 9 numbers")
});


const Account = () => {
  const [image, setImage] = React.useState<any>();

  const dispatch = useDispatch();
  const handleSave = (data: any) => {
    const form  = new FormData()
    console.log(image)
    form.append("firstName", data.firstName)
    form.append("lastName", data.lastName)
    form.append("email", data.email)
    form.append("phoneNumber", data.phoneNumber)
    form.append("image", image)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const params = {
      url: `/user/update/${user.id}`,
      data: form,
      id: user.id,
      options: options,
    };
    dispatch<any>(update(params));
  };

  const handleLogout = () => {
    dispatch<any>(logout());
  };
  const handleImage = (e: any) => {
    const img = e.target.files[0];
    setImage(img);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(address),
  });

  return (
    <div className="w-full text-white">
      <h2 className="text-white text-4xl pb-10 ">Account</h2>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="border border-violet py-4 px-8  rounded-md"
      >
        <h3 className="text-2xl font-light">Pesonal informations</h3>
        <div className="flex gap-8 mt-5 items-center">
          <img
            className=" h-14 w-14  object-cover rounded-md"
            src={
              user.photo
                ? `http://localhost:5000/${
                    user.photo.split("\\")[1] + "/" + user.photo.split("\\")[2]
                  }`
                : imgDefault
            }
            alt="user perfil photo"
          />
          <div>
            <label
              htmlFor="image"
              className="bg-opacity-0 border w-28 rounded-md text-violet border-violet h-10 px-5 py-2 cursor-pointer"
            >
              Change
            </label>
            <input
              type="file"
              id="image"
              className=" hidden"
              onChange={(e) => handleImage(e)}
            />
          </div>
        </div>
        <div className="flex flex-wrap mt-6 gap-x-10 gap-y-6">
          <div className="flex flex-col">
            <Label name="Fist name" />
            <input
              className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
              defaultValue={user.firstName}
              placeholder="example"
              {...register("firstName")}
            />
              <p className="text-red-600">
            {errors?.firstName && <>{errors.firstName.message} </>}
            </p>
          </div>

          <div className="flex flex-col">
            <Label name="last name" />
            <input
              className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
              defaultValue={user.lastName}
              placeholder="example"
              {...register("lastName")}
            />
             <p className="text-red-600">
            {errors?.lastName && <>{errors.lastName.message} </>}
            </p>
          </div>
          <div className="flex flex-col">
            <Label name="E-mail" />
            <input
              className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
              defaultValue={user.email}
              placeholder="example@email.com"
              {...register("email")}
            />
              <p className="text-red-600">
            {errors?.email && <>{errors.email.message} </>}
            </p>
          </div>
          <div className="flex flex-col">
            <Label name="Phone number" />
            <input
              className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
              placeholder="15999999999"
              defaultValue={user.phoneNumber}
              {...register("phoneNumber")}
            />
             <p className="text-red-600">
            {errors?.phoneNumber && <>{errors.phoneNumber.message} </>}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center pt-10">
          <button
            onClick={() => handleLogout()}
            className="bg-opacity-0 border w-40 rounded-md text-blue-800 border-blue-800 h-10"
          >
            Logout
          </button>
          <input
            type="submit"
            className="bg-violet  border w-40 rounded-md text-white border-violet h-10 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default Account;
