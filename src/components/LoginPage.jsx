import React, {  useRef, useState } from 'react'
import { Button, Form,Nav } from 'react-bootstrap'
import { NavLink, useHistory } from "react-router-dom";
import classes from './LoginPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/AuthSlice';
import { BsEye, BsEyeSlash } from "react-icons/bs";

function LoginPage() {

    const dispatch  = useDispatch();
    const history = useHistory();
    const inputMailRef = useRef()
    const inputPassRef = useRef()

    const [login, setLogin] = useState(false);
    
    const [showPassword, setShowPassword] = useState(false);

    const showPasswordHandler = () => {
      setShowPassword(!showPassword);
    };

    const forgotPassHandler = ()=>{
      dispatch(authActions.forgotPass())
    }

    const submitHandler= async(event)=>{
        try {   
            event.preventDefault();
            setLogin(true);
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
                    setLogin(null)
                    throw new Error(message);
                }
                const data = await response.json();
                data && alert('Login Successfull');
                data && history.replace("/ExpenseDetails");
                dispatch(authActions.login({token: data.idToken, email: data.email}));
                // authCtx.login(data.idToken,enteredMail)
                
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
                  <div className='input-group'>
                  <Form.Control type={showPassword ?'text' : 'password'} placeholder='password' ref={inputPassRef} required autoComplete='new-password'/>
                  <Button className="input-group-append" onClick={showPasswordHandler}>{showPassword ? <BsEyeSlash /> : <BsEye />}</Button> 
                  </div>
            </Form.Group>
            <div>
                {!login ? (<Button variant="success pl-2" type="submit">Login</Button>) : (<p style={{ color: "white" }}>Loading...</p>)}
                  <NavLink to={"/ForgotPass"} style={{ color: "lightblue", marginLeft: "1rem", padding: '0.1rem'}} onClick={forgotPassHandler}>
                      Forgot Password?
                  </NavLink>
            </div>
            <Nav> 
                <NavLink to={"/SignupPage"} style={{ color: "white", paddingTop: "1rem" }}>
                    Don't have an Account?
                </NavLink>
            </Nav>
        </Form>
    </section>
  )
}

export default LoginPage