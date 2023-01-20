import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

/*the reducer function will be trigged when dispatchEmail is running
state is the last state value = emailState
action is the object sent from dispatch function
{type: 'USER_INPUT', val: event.target.value}
*/
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    //return New State object
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    //return New State object
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return {
    value: "",
    isValid: false,
  };
};
const Login = (props) => {
  /* const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(); 
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });
  /*Object destructure: use here better than write emailState.isValid
  It's not a value assignment but an alias assignment */
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef;
  const passwordInputRef = useRef;
  useEffect(() => {
    //waiting for 500ms until verify the entered email & pass
    const timer = setTimeout(() => {
      //this code will runs only one time better performant
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    /*the return here is a cleanup function that will be run before the useEffect is run
    Not before the first execution 
    */
    return () => {
      //Clear the last timer for starting new one
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    /*Trigger the reducer function
     and send the action object = {type: 'USER_INPUT', val: event.target.value}*/
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    /*setFormIsValid(
      event.target.value.includes("@") && passwordState.value.isValid
    );*/
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) authCtx.onLogin(emailState.value, passwordState.value);
    else {
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          htmlFor="email"
          label="E-Mail"
          value={emailState.value}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          valid={emailIsValid}
        />
        <Input
          ref={passwordInputRef}
          htmlFor="password"
          label="Password"
          value={passwordState.value}
          type="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          valid={passwordIsValid}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
