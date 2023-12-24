import SignUp from "./components/SignUp";
import { Switch,Route,BrowserRouter as Router} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AfterLogin from "./components/AfterLogin";

function App() {
  
  return (
    <>
      <Switch>
        <Route exact path='/'>
            <SignUp/>
        </Route>
        <Route exact path='/LoginPage'>
            <LoginPage/>
        </Route>
        <Route exact path='/WelcomePage'>
            <AfterLogin/>
        </Route>
      </Switch>
    </>
  );
}

export default App;