import React, { useRef } from 'react'
import { Button, Form, Nav } from 'react-bootstrap';
import classes from './LoginPage.module.css';
import { useHistory, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { authActions } from './store/AuthSlice';

function ForgotPass() {

    const inputMailRef = useRef()
    const history = useHistory()
    const dispatch = useDispatch()

    const ForgotPasswordHandler = async (event) => {
        try {
            event.preventDefault()
            alert("you may have received an email with reset link");
            dispatch(authActions.forgotPass())
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc",
                {
                  method: "POST",
                  body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: inputMailRef.current.value,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              if(!response.ok){
                const errorData = await response.json()
                throw new Error(errorData.error.message);
              }

              const data = await response.json();
              data && history.replace('/LoginPage')
        } catch (error) {
            alert(error)
        }
       
      };
    
  return (
    <section className={classes.Look}>
    <h1>Forget Password</h1>
        <Form onSubmit={ForgotPasswordHandler}>
            <Form.Group className='mb-3'>
                <Form.Label>Registered Email</Form.Label>
                <Form.Control type='email' placeholder='Registered Email' ref={inputMailRef} required autoComplete='new-mail'/>  
                <Button type='submit' className='mt-3'>Send Link</Button>
            </Form.Group>
        </Form>
        <Nav>
            <NavLink to={"/SignupPage"} style={{ color: "white", paddingTop: "1rem" }}>
                Don't have an Account?
            </NavLink>
        </Nav>
    </section>
  )
}

export default ForgotPass