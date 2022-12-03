import Label from "../../components/Label";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, sign } from "../../slice/userSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from  'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useState, useEffect} from 'react'

 const createLoginFormSchema = yup.object().shape({
  email: yup.string().required('E-mail is required').email(),
  password: yup.string().required('Password is required').min(5, 'must have more than 4 caracters')
})

const Login = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userError, setUserError] = useState<string>('')


  useEffect(()=>{
    if(user.error)  setUserError(user.error)
  }, [user])

  const handleLogin = (data: object) => {
    dispatch<any>(sign(data));

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createLoginFormSchema)
  });


  return (
    <div>
      <div className="w-full flex justify-center items-center min-h-screen flex-col">
        <h1 className="text-white text-4xl">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="flex-col flex gap-2  mt-2">
          <Label name={"Email"} />
          <input
            type="text"
            placeholder="example@mail.com"
            className={`${errors?.email? 'border border-red-600' : '' }  bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white `}
            {...register("email")}
          />
          <p className="text-red-600">{errors?.email && <>{errors.email.message} </>}</p>
          <Label name={"Password"} />
          <input
            type="password"
            placeholder="***********"
            className={`${errors.password ? 'border border-red-500': ''} bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white `}
            {...register("password")}
          />
          <p className="text-red-600">{errors?.password && <>{errors.password.message} </>}</p>
          <input type="submit" className='bg-violet text-white p-2 text-xl mt-8 cursor-pointer rounded-md'/>
          {userError && <p className="text-red-600 border text-center p-2 border-red-600 mt-5">{userError}</p> }
          <p className="text-white text-xl mt-5 text-center  font-thin">
            Ainda não tem uma conta?
            <Link to="/signout">
              <span className="text-violet cursor-pointer"> criar conta.</span>
            </Link>
          </p>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
