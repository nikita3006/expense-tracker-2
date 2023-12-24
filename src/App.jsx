import SignUp from "./components/SignUp";
import { Switch,Route,Redirect} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AfterLogin from "./components/AfterLogin";
import FirstPageDetails from "./components/FirstPage";
import CompleteProfile from "./components/CompleteProfile";
import Verificationpage from "./components/Verificationpage";
import Expense from "./components/Expense";
import { useDispatch, useSelector } from "react-redux";
import ForgotPass from "./components/ForgotPass";


function App() {
  const isLogin = useSelector((state)=>state.auth.isLoggedIn)
  const forgotPass = useSelector(state => state.auth.forgotPass);
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
              {isLogin && <AfterLogin/>}
              {!isLogin && <Redirect  to="/LoginPage"/>}
          </Route>
          <Route exact path='/completeProfile'>
              {isLogin &&<CompleteProfile/>}
              {!isLogin && <Redirect  to="/LoginPage"/>}
          </Route>
          <Route exact path="/">
            {isLogin && <Redirect to='/ExpenseDetails' />}  
            {!isLogin && <Redirect  to="/LoginPage"/>}
          </Route>  
          <Route exact path='/ExpenseDetails'>
            {isLogin && <Expense/>}  
            {!isLogin && <Redirect  to="/LoginPage"/>}
          </Route>
          <Route exact path="/verify-email">
            {isLogin && <Verificationpage /> }  
            {!isLogin && <Redirect  to="/LoginPage"/>}
          </Route>
          <Route exact path="/ForgotPass">
              {isLogin && <Expense />}
              {forgotPass && !isLogin && <ForgotPass/>}
              {!forgotPass && <Redirect to='/LoginPage'/>}
          </Route>
          <Route exact path="*"> 
            {isLogin && <Redirect to='/WelcomePage' />}  
            {!isLogin && <Redirect  to="/LoginPage"/>}
          </Route>  
        </Switch>
    </>
  );
}

export default App;