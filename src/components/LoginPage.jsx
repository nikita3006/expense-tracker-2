import React, { useRef } from 'react'
import { Button, Form,Nav } from 'react-bootstrap'
import { Link, NavLink, useHistory } from "react-router-dom";
import classes from './LoginPage.module.css';

function LoginPage() {
    const history = useHistory();
    const inputMailRef = useRef()
    const inputPassRef = useRef()

    const submitHandler= async(event)=>{
        try {   
            event.preventDefault();
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
                    throw new Error(message);
                }
                const data = await response.json();
                data && alert('Login Successfull');
                data && history.replace("/WelcomePage");
            }
        } catch (error) {
            console.log(error);
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
                <Button variant='success pl-2' type='submit'>Sign in</Button>
                <Link style={{ color: "white", paddingLeft: "2rem" }}>
                    Forgot password?
                </Link>
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