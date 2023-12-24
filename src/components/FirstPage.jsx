import { Button,Navbar, Nav, Container,Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./FirstPage.module.css";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/AuthSlice";
import { expenseActions } from "./store/ExpenseSlice";
import { useEffect, useState } from "react";



const FirstPageDetails = () => {
  
  const dispatch = useDispatch();
  const userEmail =useSelector((state) =>state.auth.userEmail)
  const isLogin = useSelector((state)=> state.auth.isLoggedIn)
  const userName = userEmail && userEmail.split("@")[0]; 
    // const isActive = useSelector(state => state.expense.isActive);
    const [active,setActive] = useState(localStorage.getItem('isActive'));
    console.log(active,'in firstpage active');
    const expenses = useSelector(state => state.expense.expenses);
    const totalExpenses = expenses.reduce((total, expense) => total + +expense.amount, 0);
    const darkMode = useSelector(state => state.expense.darkMode);
    const [isPremiumEligible, setIsPremiumEligible] = useState(
      localStorage.getItem("isPremiumEligible") 
    );
    if (!isPremiumEligible && totalExpenses > 10000) {
      localStorage.setItem("isPremiumEligible",true);
      setIsPremiumEligible(true);
    }
    const activePremiumHandler = ()=>{
      dispatch(expenseActions.activatePremium());
      setActive(true);
    }

    const darkModeHandler = ()=>{
      // localStorage.setItem("darkMode",userName);
      dispatch(expenseActions.darkMode());
    }

    const removeDarkMode = ()=>{
      dispatch(expenseActions.lightMode());
    }
    const downloadExpense = () => {
      const data =
        "Expense,Category,Amount\n" + 
        expenses.map(
          ({amount,category,description})=> `${amount},${category},${description}`
        ).join("\n");
  
      // Create a new blob with the CSV data
      const blob = new Blob([data]);

      saveAs(blob, "expenses.csv");
    }
    // console.log(darkMode,'in fistpage darkmode')
    document.documentElement.style.setProperty(
      '--background-image',
      darkMode ? 'var(--background-image-dark)' : 'var(--background-image-light)'
    );

  const logout = () => {
    dispatch(authActions.logOut());
    dispatch(expenseActions.lightMode())
    setActive(false);
    dispatch(expenseActions.replaceExpenses([]));
    setIsPremiumEligible(null);
    localStorage.clear();
  
  };

  return (
    <Navbar style={{marginTop : "450px"}}
      // bg="white"
      bg={darkMode?'dark':'white'}
      data-bs-theme={darkMode ? "dark":''}
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
            <div style={{margin:'5px'}}>
              {isPremiumEligible && !active && (<Button variant='success' onClick={activePremiumHandler}>Activate Premium</Button>)}
              {/* {isActive && <Form.Check type="switch" id="custom-switch" checked={darkMode} onChange={darkModeHandler} style={{color: darkMode ? 'white' : 'black'}} label="Modes"/> }  */}
              {isPremiumEligible && active && <Button onClick={darkMode ? removeDarkMode : darkModeHandler}>{darkMode ? 'Light Mode':'Dark Mode'}</Button>}{' '}
              {isPremiumEligible && active &&  <Button onClick={downloadExpense} >Download Expenses</Button>}
            </div>
            )
          }

          {isLogin && (
            <NavLink
              to="/LoginPage"
              className={classes.font}
              style={{ color: "Red" }}
              onClick={logout}
            >
              LOGOUT
            </NavLink>
          )}{' '}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default FirstPageDetails;