import React, { useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import classes from './LoginPage.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ForgotPass() {

    const inputMailRef = useRef()
    const history = useHistory()

    const ForgotPasswordHandler = async (event) => {
        try {
            event.preventDefault()
            alert("you may have received an email with reset link");
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
    </section>
  )
}

export default ForgotPass