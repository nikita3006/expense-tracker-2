import SignUp from "./components/SignUp";
import { Switch,Route,BrowserRouter as Router} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AfterLogin from "./components/AfterLogin";
import FirstPageDetails from "./components/FirstPage";
import CompleteProfile from "./components/CompleteProfile";


function App() {
  
  return (
    <>
      <FirstPageDetails/>
      <Switch>
        <Route exact path='/SignupPage'>
            <SignUp/>
        </Route>
        <Route exact path='/LoginPage'>
            <LoginPage/>
        </Route>
        <Route exact path='/WelcomePage'>
            <AfterLogin/>
        </Route>
        <Route exact path='/completeProfile'>
            <CompleteProfile/>
        </Route>
      </Switch>
    </>
  );
}

export default App;