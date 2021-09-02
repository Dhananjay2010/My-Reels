import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./Component/login"
import AuthProvider from "./Component/authProvider";
import Home from "./Component/home";
import SignUp from "./Component/signUp";
import Profile from "./Component/profile";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
          <Route path="/profile">
              <Profile/>
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
