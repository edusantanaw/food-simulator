import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { lazy, Suspense } from "react";
import Header from "./pages/partials/Header";
import Loader from "./components/Loader";
import Signout from "./pages/login/Signout";
import Login from "./pages/login/Login";


const Home = lazy(() => import("./pages/home/Home"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Deals = lazy(() => import("./pages/deals/Deals"));
const Order = lazy(() => import("./pages/order/Order"));
const Category = lazy(() => import("./pages/category/Category"));
const Menagement = lazy(() => import("./pages/admin/Menagement"));

const user = JSON.parse(localStorage.getItem("@App:user") || "{}");
function App() {
  const { auth } = useAuth();

  return (
    <div className="w-full min-h-screen bg-black">
      <Router>
        {auth && <Header />}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/sign" />}
            />
            <Route
              path="/sign"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/user/settings/:id"
              element={auth ? <Settings /> : <Login />}
            />
            <Route
              path="/admin"
              element={user.admin ? <Menagement /> : <Navigate to="/" />}
            />
            <Route
              path="/deals"
              element={auth ? <Deals /> : <Navigate to="/sign" />}
            />
            <Route
              path="/order/:id"
              element={auth ? <Order /> : <Navigate to="/sign" />}
            />
            <Route
              path="/category/:name"
              element={auth ? <Category /> : <Navigate to="/sign" />}
            />
            <Route
              path="/signout"
              element={!auth ? <Signout /> : <Navigate to="/" />}
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
