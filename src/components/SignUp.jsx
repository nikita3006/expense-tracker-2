import React, { useRef } from "react";
import { Button, Form, Nav} from "react-bootstrap";
import classes from "./SignUp.module.css";
import { NavLink } from "react-router-dom";

function SignUp() {
  const inputMailRef = useRef();
  const inputPassRef = useRef();
  const inputConfPass = useRef();

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const enteredMail = inputMailRef.current.value;
      const enteredPass = inputPassRef.current.value;
      const enteredConfPass = inputConfPass.current.value;

      if (enteredPass !== enteredConfPass) {
        alert("Password and confirm password doesnt match");
        return;
      } else {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredMail,
              password: enteredPass,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response, "in signup");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message);
        }

        const data = await response.json();
        data && alert("account created");
        console.log(data, "in sign up data");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section className={classes.Look}>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            ref={inputMailRef}
            autoComplete='new-mail'
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            minLength="7"
            ref={inputPassRef}
            autoComplete='new-password'
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            minLength="7"
            ref={inputConfPass}
            autoComplete='new-password'
          />
        </Form.Group>

        <div>
          <Button variant="success pl-2" type="submit">
            Create Account
          </Button>
        </div>
        <Nav>
          <NavLink
            to="/LoginPage"
            style={{ color: "white", paddingTop: "1rem" }}
          >
            Have an Account?
          </NavLink>
        </Nav>
      </Form>
    </section>
  );
}

export default SignUp;
