import SignUp from "./components/SignUp";
import { Switch,Route,Redirect} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AfterLogin from "./components/AfterLogin";
import FirstPageDetails from "./components/FirstPage";
import CompleteProfile from "./components/CompleteProfile";
import Verificationpage from "./components/Verificationpage";


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
        <Route exact path="/">
          <Redirect to="/LoginPage" />
        </Route>  
        <Route exact path="/verify-email">
          <Verificationpage />
        </Route>
      </Switch>
    </>
  );
}

export default App;