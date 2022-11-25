import React from "react";
import { useDispatch } from "react-redux";
import Label from "../../../components/Label";
import { update } from "../../../slice/userSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const user = JSON.parse(localStorage.getItem("@App:user") || "{}");
const token = localStorage.getItem("@App:token");

const address = yup.object().shape({
  street: yup
    .string()
    .required("Street is required")
    .min(5, "must have more than 4 caracters"),
  number: yup
    .number()
    .typeError("must be a number")
    .required("Number is required")
    .integer(),
  city: yup
    .string()
    .required("City is required")
    .min(3, "must have more than 3 caracters"),
  cep:yup.number()
  .typeError("must be a number")
  .required("Number is required")
  .integer(),
});

const Address = () => {
  const dispatch = useDispatch();

  const handleSave = (data: object) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const params = {
      url: `/user/address/${user.id}`,
      data: data,
      options: options,
    };
    dispatch<any>(update(params));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(address),
  });

  return (
    <div>
      <h2 className="text-white text-4xl pb-10 ">Address</h2>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="border border-violet py-4 px-8 flex flex-wrap gap-x-10 gap-y-4  rounded-md"
      >
        <div className="flex flex-col">
          <Label name="Street" />
          <input
            type="text"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
            placeholder="example"
            {...register("street")}
          />
          <p className="text-red-600">
            {errors?.street && <>{errors.street.message} </>}
          </p>
        </div>
        <div className="flex flex-col">
          <Label name="Number" />
          <input
            type="number"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
            placeholder="500"
            {...register("number")}
          />
          <p className="text-red-600">
            {errors?.number && <>{errors.number.message} </>}
          </p>
        </div>
        <div className="flex flex-col">
          <Label name="name" />
          <input
            type="text"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
            placeholder="São paulo"
            {...register("city")}
          />
          <p className="text-red-600">
            {errors?.city && <>{errors.city.message} </>}
          </p>
        </div>
        <div className="flex flex-col">
          <Label name="CEP" />
          <input
            type="number"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
            placeholder="192121"
            {...register("cep")}
          />
          <p className="text-red-600">
            {errors?.cep && <>{errors.cep.message} </>}
          </p>
        </div>
        <input
          type="submit"
          className="bg-violet  border w-40 rounded-md text-white border-violet h-10"
        />
      </form>
    </div>
  );
};

export default Address;
