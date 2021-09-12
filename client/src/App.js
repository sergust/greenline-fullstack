import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.component";
import NotFound from "./pages/404NotFoundPage/NotFound.component";
import SignIn from "./pages/SignIn/SignIn.component";
import SignUp from "./pages/SignUp/SignUp.component";
import UserProfile from "./pages/Profile/UserProfile.component";
import AdminProfile from "./pages/Profile/AdminProfile.component";
import Message from "./pages/Message/index";
import Conversation from "./pages/Message/Conversation";
import OrderProductsDealer from "./pages/OrderProducts/OrderProductsDealer.component";
import OrderProductsManufacturer from "./pages/OrderProducts/OrderProductsManufacturer.component";
import io from "socket.io-client";
import AdminRoute from "./customRouter/AdminRoute";
import PrivateRoute from "./customRouter/PrivateRoute";
import SuperAdminRoute from "./customRouter/SuperAdminRoute";
import SubscriberRoute from "./customRouter/SubscriberRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SOCKET } from "./redux/actions/action.types";
import SocketClient from "./SocketClient";
import "./App.css";
import ShowProducts from "./pages/Products/ShowProducts.component";
import ProductsDetail from "./pages/Products/ProductsDetail.component";
import Productslist from "./pages/Products/Productslist.component";
import Categorylist from "./pages/Category/Categorylist.component";
import CreateProducts from "./pages/Products/CreateProducts.component";
import CreateCategories from "./pages/Category/CreateCategories.component";
import Videos from "./pages/Videos/Videos.component";
import CreateVideos from "./pages/Videos/CreateVideos.component";
import Orders from "./pages/Orders/Orders.component";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    dispatch({ type: SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {userInfo?.token && <SocketClient />}
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dealer" component={OrderProductsDealer} />
          <Route path="/manufacturer" component={OrderProductsManufacturer} />
          <PrivateRoute path="/profile" component={UserProfile} />
          <PrivateRoute path="/message" component={Message} />
          <PrivateRoute path="/conversation/:id" component={Conversation} />
          <PrivateRoute path="/products" component={ShowProducts} />
          <PrivateRoute path="/product/:id" component={ProductsDetail} />
          <AdminRoute path="/admin/profile" component={AdminProfile} />
          <SuperAdminRoute path="/admin/productlist" component={Productslist} />
          <SuperAdminRoute
            path="/admin/categorylist"
            component={Categorylist}
          />
          <SuperAdminRoute
            path="/admin/product/create"
            component={CreateProducts}
          />
          <SuperAdminRoute
            path="/admin/category/create"
            component={CreateCategories}
          />
          <SuperAdminRoute path="/admin/video/add" component={CreateVideos} />
          <SuperAdminRoute path="/admin/orders" component={Orders} />
          <SubscriberRoute path="/videos" component={Videos} />
          <Route path="*" component={NotFound} />
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
