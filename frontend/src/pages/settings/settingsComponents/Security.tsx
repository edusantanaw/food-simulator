import React from "react";
import { useDispatch } from "react-redux";
import Label from "../../../components/Label";
import { update } from "../../../slice/userSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const user = JSON.parse(localStorage.getItem("@App:user") || "{}");
const token = localStorage.getItem("@App:token");

const createLoginFormSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(5, "must have more than 4 caracters"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(5, "must have more than 4 caracters"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .min(5, "must have more than 4 caracters"),
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
      url: `/user/password/${user.id}`,
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
    resolver: yupResolver(createLoginFormSchema),
  });

  return (
    <div>
      <h2 className="text-white text-4xl pb-10 ">Security</h2>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="border border-violet py-4 px-8 flex   flex-col flex-wrap  gap-y-7  rounded-md"
      >
        <div className="flex flex-col ">
          <Label name="Actual password" />
          <input
            type="password"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-full"
            placeholder="visa"
            {...register("password")}
          />
          <p className="text-red-600">
            {errors?.password && <>{errors.password.message} </>}
          </p>
        </div>
        <div className="flex flex-col">
          <Label name="New password" />
          <input
            type="password"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-full"
            placeholder="501232130"
            {...register("newPassword")}
          />
          <p className="text-red-600">
            {errors?.newPassword && <>{errors.newPassword.message} </>}
          </p>
        </div>
        <div className="flex flex-col">
          <Label name="Confirm password" />
          <input
            type="password"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-full"
            placeholder="555"
            {...register("confirmPassword")}
          />
          <p className="text-red-600">
            {errors?.confirmPassword && <>{errors.confirmPassword.message} </>}
          </p>
        </div>

        <input
          type="submit"
          className="bg-violet  border w-72 rounded-md text-white border-violet h-10 self-center"
        />
      </form>
    </div>
  );
};

export default Address;
