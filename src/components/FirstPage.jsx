import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./FirstPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/AuthSlice";



const FirstPageDetails = () => {
  const dispatch = useDispatch()
  // const userMail =useSelector((state) =>state.auth.userEmail)
  const isLogin = useSelector((state)=> state.auth.isLoggedIn)
  console.log(isLogin,'in firstpage')
  // const userName = userEmail && userEmail.split("@")[0];

  const logout = () => {
    dispatch(authActions.logOut());
  };


  return (
    <Navbar style={{marginTop : "450px"}}
      bg="white"
      expand="lg"
      variant="light"
      className="border border-white mt-2 "
    >
      <Navbar.Brand style={{ fontSize: "xx-large", marginLeft: "2rem" }}>
        ExpenseTracker App
      </Navbar.Brand>
      <Container className="justify-content-center ">
        <Nav>
          {!isLogin && (
            <>
              <NavLink to="/LoginPage" className={classes.login}>
                Login
              </NavLink>

              <NavLink to="/SignupPage" className={classes.signup}>
                SignUp
              </NavLink>
            </>
          )}
          {isLogin && (
            <NavLink
              to="/LoginPage"
              className={classes.font}
              style={{ color: "Red" }}
              onClick={logout}
            >
              LOGOUT
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default FirstPageDetails;