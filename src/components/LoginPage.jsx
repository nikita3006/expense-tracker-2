import React, { useContext, useRef, useState } from 'react'
import { Button, Form,Nav } from 'react-bootstrap'
import { NavLink, useHistory } from "react-router-dom";
import classes from './LoginPage.module.css';
import AuthContext from './store/AuthContext';

function LoginPage() {
    const authCtx = useContext(AuthContext)


    const history = useHistory();
    const inputMailRef = useRef()
    const inputPassRef = useRef()

    const [login, setLogin] = useState(false);

    const ForgotPasswordHandler = () => {
    alert("you may have received an email with reset link");
    console.log(emailInputRef.current.value);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailInputRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Login succesfullly");
          console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorMessage = "Email sent for reset password";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

    const submitHandler= async(event)=>{
        try {   
            event.preventDefault();
            setIsLogin(true);
            authCtx.login();
            const enteredMail = inputMailRef.current.value;
            const enteredPass = inputPassRef.current.value;
            if(enteredMail==='' || enteredPass === ''){
                alert("Must fill both Field")
            }else{
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc',{
                    method: "POST",
                    body: JSON.stringify({
                        email: enteredMail,
                        password: enteredPass,
                        returnSecureToken : true
                    }),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                if(!response.ok){
                    const errorData = await response.json();
                    const message = errorData ? (errorData.error.message) : ('Authentication Failed');
                    setIsLogin(null)
                    throw new Error(message);
                }
                const data = await response.json();
                data && alert('Login Successfull');
                data && history.replace("/verify-email");
                authCtx.login(data.idToken,enteredMail)
                
            }
        } catch (error) {
            alert(error);
        }
    }
  return (
    <section className={classes.Look}>
        <h1>Log In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Email' ref={inputMailRef} required autoComplete='new-mail'/>  
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='password' ref={inputPassRef} required autoComplete='new-password'/>
            </Form.Group>
            <div>
                {!login ? (<Button variant="success pl-2" type="submit">Login</Button>) : (<p style={{ color: "white" }}>Loading...</p>)}
                <Button
                    onClick={ForgotPasswordHandler}
                    style={{ color: "white", marginLeft: "1rem", padding: "0.1rem" }}
                >
                    Forgot Password?
                </Button>
            </div>
            <Nav>
                <NavLink to={"/"} style={{ color: "white", paddingTop: "1rem" }}>
                    Don't have an Account?
                </NavLink>
            </Nav>
        </Form>
    </section>
  )
}

export default LoginPage