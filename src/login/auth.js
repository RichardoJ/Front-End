import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import useInput from "../teacherpages/Hooks/use-input";
import classes from "./auth.module.css";

function AuthForm() {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  let formIsValid = false;


  //Name
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  //Password
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length >= 8);

  if(enteredEmailIsValid && enteredPasswordIsValid){
    formIsValid = true;
  }


  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDccKXMRv1RtSZ5zm--yE-kmPYBW7JGq9k";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            // if(data && data.error && data.error.message){
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, data.localId, expirationTime.toISOString());
        fetch("/auth/login/" + enteredEmail, {
          method:"GET"
        }).then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "";
              if(data && data.error && data.error.message){
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        }).then((data) =>{
          if(data.role === "STUDENT"){
            authCtx.setID(data.ID);
            authCtx.setRole(data.role);
            resetEmailInput();
            resetPasswordInput();
            navigate('/student/home');
          }else if(data.role === "TEACHER"){
            authCtx.setID(data.ID);
            authCtx.setRole(data.role);
            resetEmailInput();
            resetPasswordInput();
            navigate('/teacher/home');
          }
        })
      })
      .catch((err) => {
        alert(err.message);
      });
   
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
      {/* <form> */}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className={classes.error}>Please enter a valid email</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <p className={classes.error}>
              Please enter a valid password with 8 characters or more
            </p>
          )}
        </div>  
        <div className={classes.actions}>
          {!isLoading && (
            <button id="btnLogin" disabled={!formIsValid}>Login</button>
          )}
          {isLoading && <p>Sending Request</p>}
          {/* {isLoggedIn && <p>Logged In Successfully</p>} */}
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
