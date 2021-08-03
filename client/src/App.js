import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.component";
import Feed from "./pages/Feed/Feed.component";
import NotFound from "./pages/404NotFoundPage/NotFound.component";
import SignIn from "./pages/SignIn/SignIn.component";
import SignUp from "./pages/SignUp/SignUp.component";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/feed" component={Feed} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
