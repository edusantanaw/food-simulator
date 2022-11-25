
import { Api } from "../utils/api";

const createUser = async (data: object) => {
  const response = await Api.post("/newUser", data)
    .then((reponse) => reponse.data)
    .catch((err) => err.response.data);
    console.log(response)
  if (response.user)
    localStorage.setItem("@App:user", JSON.stringify(response.user));
  if (response.token) localStorage.setItem("@App:token", response.token);

  return response;
};
const signin = async (data: object) => {
  const response = await Api.post("/signin", data)
    .then((response) => response.data)
    .catch((err) => err.response.data);
  if (response.user)
    localStorage.setItem("@App:user", JSON.stringify(response.user));
  if (response.token) localStorage.setItem("@App:token", response.token);
  return response;
};

const logout = () => {
  localStorage.removeItem("@App:user");
  localStorage.removeItem("@App:token");
  return;
};

interface update {
  options: Object;
  data: HTMLFormElement;
  url: string;
}

const update = async (data: update) => {
  console.log(data)
  const response = await Api.patch(
    data.url,
    data.data,
    data.options
  )
    .then((response) => response.data)
    .catch((err) => err.response.data);
  if (response.user)
    localStorage.setItem("@App:user", JSON.stringify(response.user));
  return response;
};


const auth = {
  createUser,
  signin,
  logout,
  update,
};

export default auth;
