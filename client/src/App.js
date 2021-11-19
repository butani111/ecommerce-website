import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignup from "./component/User/LoginSignup";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import AboutUs from "./component/layout/About/AboutUs";
import ContactPage from "./component/layout/Contact/ContactPage";
import NotFound from "./component/layout/NotFound/NotFound";
// import axios from "axios";

function App() {
  const { isAuthorizedUser, user } = useSelector((state) => state.user);

  // Get API key from server for Payment process
  // Uncommnet the below code for actual payment process

  // const [stripeApiKey, setStripeApiKey] = useState(""); // stripe_public_key
  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // }
  const stripeApiKey =
    "pk_test_51Jt33pSGSli6IuTUCJkn5NyaeE7IPf3QVFtcsoCN8Ulnp2BtsQ0AJupY1jm5zS6waQUdNqPx0SAZdVyjMdTelVsq00zZmg2H6m";

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);

  // Cannot right click on this website
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthorizedUser && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />

        <Route exact path="/login" component={LoginSignup} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/orders/:id" component={OrderDetails} />

        <ProtectedRoute
          exact
          path="/admin/dashboard"
          component={Dashboard}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          component={ProductList}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          component={NewProduct}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          component={OrderList}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          component={UserList}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/user/:id"
          component={UpdateUser}
          isAdmin={true}
        />
        <ProtectedRoute
          exact
          path="/admin/reviews"
          component={ProductReviews}
          isAdmin={true}
        />

        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/contact" component={ContactPage} />

        {window.location.pathname !== "/process/payment" && (
          <Route component={NotFound} />
        )}
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
