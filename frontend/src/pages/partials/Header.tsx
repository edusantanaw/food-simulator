import { useState } from "react";
import { IoBasket } from "react-icons/io5";
import { useDispatch } from "react-redux";
import imgDefault from "../../assets/perfilDefault.jpg";
import { logout } from "../../slice/userSlice";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleLeft } from "react-icons/fa";
import Cart from "./header/Cart";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("@App:user") || "{}");
  const [cart, setCart] = useState<Boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [perfilToggle, setPerfilToggle] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch<any>(logout());
  };

  const handleBasket = (): void => {
    setCart(cart ? false : true);
  };

  return (
    <>
      {cart && <Cart handleBasket={handleBasket} />}
      <div className="text-white flex fixed justify-between items-center px-12 pt-5 pb-2 md:px-28 w-full bg-black z-10 ">
        <Link to="/">
          <div className="text-3xl font-semibold">
            <h1>Food</h1>
            <h1 className="text-violet">delivery</h1>
          </div>
        </Link>
        <GiHamburgerMenu
          className={` ${
            !menu ? "block" : "hidden"
          } block cursor-pointer text-4xl md:hidden`}
          onClick={() => setMenu(menu ? false : true)}
        />
        <ul
          className={`${
            menu ? "flex " : "hidden"
          } flex-col justify-start py-20 px-10 text-3xl   bg-black fixed w-1/2 h-screen top-0 right-0 md:relative md:flex md:h-auto md:flex-row md:p-0 md:justify-end gap-10 md:w-2/3 font-medium text-violet md:text-lg cursor-pointer md:items-center`}
        >
          <FaAngleLeft
            onClick={() => setMenu(menu ? false : true)}
            className=" cursor-pointer block md:hidden absolute top-8 left-3 text-4xl "
          />
          <li>
            <Link to="/deals">Deals</Link>
          </li>
          <li>
            <Link to={`/order/${user.id}`}>My order</Link>
          </li>
          <li className=" block md:hidden">
            <Link to={`/user/settings/${user.id}`}>Settings</Link>
          </li>
          {user.admin && (
            <li  className=" block md:hidden"> 
              <Link to="/admin">management</Link>
            </li>
          )}
          <li  className=" block md:hidden" onClick={() => handleLogout()}>Logout</li>
          <li className="flex">
            <IoBasket className=" md:text-2xl" onClick={() => handleBasket()} />
          </li>
          <li
            className="relative flex justify-center"
            onClick={() => setPerfilToggle(perfilToggle ? false : true)}
          >
            {perfilToggle && (
              <ul className="absolute top-10  bg-gray-900 hidden md:flex flex-col gap-3 p-3 rounded-lg">
                <li>
                  <Link to={`/user/settings/${user.id}`}>Settings</Link>
                </li>
                {user.admin && (
                  <li>
                    <Link to="/admin">management</Link>
                  </li>
                )}
                <li onClick={() => handleLogout()}>Logout</li>
              </ul>
            )}
            {user.photo ? (
              <img
                className="hidden md:flex h-8 items-center object-cover rounded-full w-8"
                src={`http://localhost:5000/${
                  user.photo.split("\\")[1] + "/" + user.photo.split("\\")[2]
                }`}
                alt="user perfil photo"
              />
            ) : (
              <img
                className="h-8 object-cover rounded-full w-8"
                src={imgDefault}
                alt="perfil default image"
              />
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
