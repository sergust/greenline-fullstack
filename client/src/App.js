import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.component";
import NotFound from "./pages/404NotFoundPage/NotFound.component";
import SignIn from "./pages/SignIn/SignIn.component";
import SignUp from "./pages/SignUp/SignUp.component";
import Profile from "./pages/Profile/Profile.component";
import AdminProfile from "./pages/Profile/AdminProfile.component";
import OrderProductsDealer from "./pages/OrderProducts/OrderProductsDealer.component";
import OrderProductsManufacturer from "./pages/OrderProducts/OrderProductsManufacturer.component";
import io from "socket.io-client";
import AdminRoute from "./customRouter/AdminRoute";
import PrivateRoute from "./customRouter/PrivateRoute";
import SubscriberRoute from "./customRouter/SubscriberRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Videos from "./pages/Videos/Videos.component";

// const socket = io("http://localhost:5000");

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/profile" component={Profile} />
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
