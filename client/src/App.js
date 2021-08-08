import "./styles/styles.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.component";
import Feed from "./pages/Feed/Feed.component";
import NotFound from "./pages/404NotFoundPage/NotFound.component";
import SignIn from "./pages/SignIn/SignIn.component";
import SignUp from "./pages/SignUp/SignUp.component";
import Navbar from "./components/Navbar/Navbar.component";
import Alert from "./components/Alert/Alert.component";
import React, { Fragment, useEffect } from "react";

// For Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/feed" component={Feed} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
