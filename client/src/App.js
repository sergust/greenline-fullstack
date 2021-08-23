import React, {useEffect} from "react";
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
import SubscriberRoute from "./customRouter/SubscriberRoute";
import Videos from "./pages/Videos/Videos.component";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SOCKET } from "./redux/actions/action.types";
import SocketClient from "./SocketClient";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    const socket = io("http://localhost:5000");
    dispatch({type: SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {userInfo?.token && <SocketClient />}
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/profile" component={UserProfile} />
          <PrivateRoute path="/message" component={Message} />
          <PrivateRoute path="/conversation/:id" component={Conversation} />
          <AdminRoute path="/admin/profile" component={AdminProfile} />
          <Route path="/dealer" component={OrderProductsDealer} />
          <Route path="/manufacturer" component={OrderProductsManufacturer} />
          <SubscriberRoute path="/videos" component={Videos} />
          <Route path="*" component={NotFound} />
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
