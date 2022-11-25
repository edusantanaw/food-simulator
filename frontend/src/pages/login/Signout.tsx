import { useRef } from "react";
import Label from "../../components/Label";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { signout } from "../../slice/userSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";

const createLoginFormSchema = yup.object().shape({
  email: yup.string().required("E-mail is required").email(),
  firstName: yup
    .string()
    .required("First name is required")
    .min(5, "must have more than 4 caracters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(5, "must have more than 4 caracters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "must have more than 4 caracters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .min(5, "must have more than 4 caracters"),
});

const Signout = () => {
  const dispatch = useDispatch();

  const handleLogin = (data: object) => {
    console.log(data)
    dispatch<any>(signout(data));
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
      <div className="w-full flex justify-center items-center min-h-screen flex-col">
        <h1 className="text-white text-4xl">Signout</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex-col flex gap-1  mt-2"
        >
          <Label name="First name" />
          <input
            type="text"
            placeholder="Eduardo"
            className="bg-zinc-900 rounded-md w-96  h-9 outline-none p-5 text-white "
            {...register("firstName")}
          />
          <p className="text-red-600">
            {errors?.firstName && <>{errors.firstName.message} </>}
          </p>
          <Label name="Last name" />
          <input
            type="text"
            placeholder="Santana"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white "
            {...register("lastName")}
          />
          <p className="text-red-600">
            {errors?.lastName && <>{errors.lastName.message} </>}
          </p>
          <Label name={"Email"} />
          <input
            type="text"
            placeholder="example@mail.com"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white "
            {...register("email")}
          />
          <p className="text-red-600">
            {errors?.email && <>{errors.email.message} </>}
          </p>
          <Label name={"Password"} />
          <input
            type="password"
            placeholder="***********"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white "
            {...register("password")}
          />
          <p className="text-red-600">
            {errors?.password && <>{errors.password.message} </>}
          </p>
          <Label name={"Confirm password"} />
          <input
            type="password"
            placeholder="***********"
            className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white "
            {...register("confirmPassword")}
          />
          <p className="text-red-600">
            {errors?.confirmPassword && <>{errors.confirmPassword.message} </>}
          </p>
          <input
            type="submit"
            className="bg-violet text-white p-2 text-xl mt-8 cursor-pointer rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default Signout;
