/*
  Authentication Component It Have Both SignUp // Login Elements
*/
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@material-ui/core/FormControl";
import CustomSnackBar from "../../common/customSnackBar";

import { useAuthContext } from "../../store/auth-context";
import { useUserContext } from "../../store/user-Context";
import LoadBackDrop from "../../common/loadBackDrop";

import classes from "./auth.module.css";

//initializing the DefaultValues for the Login // Signup form
const defaultValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  photoURL: "",
};

const Auth = (props) => {
  //Calling the user, Auth Context
  const userCtx = useUserContext();
  const authCtx = useAuthContext();

  // States
  const [formValues, setFormValues] = useState(defaultValues); // Form Values State
  const [isSuccess, setIsSuccess] = useState(false); // isSuccess State that will check if the Action return with success or error
  const [feedbackMessage, setFeedbackMessage] = useState(""); // FeedBack Message for the Submit
  const [isLogin, setIsLogin] = useState(props.isLogin); //True --> login // False -> signUp
  const [isLoading, setIsLoading] = useState(false);

  //TextFields Properties
  const textFieldProperties = [
    //First Name TextField Input property appears if the user is in signUp mode
    !isLogin && {
      id: "auth__fname",
      name: "fname",
      label: "First Name:",
      type: "text",
      variant: "outlined",
      required: true,
      style: { width: 485 },
    },
    //Last Name TextField Input property appears if the user is in signUp mode
    !isLogin && {
      id: "auth__lname",
      label: "Last Name:",
      name: "lname",
      type: "text",
      variant: "outlined",
      required: true,
      style: { width: 485 },
    },

    //Email Textfield Input Property
    {
      id: "auth__email",
      label: "Email:",
      name: "email",
      type: "email",
      variant: isLogin ? "filled" : "outlined",
      required: true,
      style: !isLogin ? { width: 485, padding: 0 } : {},
    },

    //Password TextField Input Property
    {
      id: "auth__password",
      label: "Password:",
      name: "password",
      variant: isLogin ? "filled" : "outlined",
      type: "password",
      required: true,
      style: !isLogin ? { width: 485, padding: 0 } : {},
    },
  ];

  //Textfield Input OnChange Handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //function that will determine the url if the user is in login or signUp
  const url = () => {
    if (isLogin) {
      return "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API-Key]";
    }
    return "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API-Key]";
  };

  //Handle OnClick Submit (Login // Signup )
  /*
    This Function will call the Authentication in the firebase using Axios
    then it will check the action 
      1.) if it return success it will return a success feedback
      2.) if error occur it will return a feedback error message 
    
    if the action is success it will save the email,a token, token expire time in the local storage.
    
    if the user is in signup mode it will let him create a new user and save it details in a database so we can access his data later onز
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    axios
      .post(url(), {
        email: formValues.email,
        password: formValues.password,
        returnSecureToken: true,
      })
      .then((res) => {
        setIsLoading(false);

        setIsSuccess(true);
        setFeedbackMessage("Action Made Successfully");
        setTimeout(() => {
          routeChange();
        }, 1000);
        const data = res.data;
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());

        if (!isLogin) {
          const user = {
            name: `${formValues.fname} ${formValues.lname}`,
            email: formValues.email,
            photoUrl: formValues.photoURL,
            history: {},
          };
          if (user) {
            userCtx.setNewUser(user);
          }

          axios.post(
            "https://car-rental-ac864-default-rtdb.firebaseio.com/users.json",
            {
              name: `${formValues.fname} ${formValues.lname}`,
              email: formValues.email,
              photoUrl: formValues.photoURL,
              history: {},
            }
          );
        }
        userCtx.setNewEmail(formValues.email);
        localStorage.setItem("email", formValues.email);
      })
      .catch((error) => {
        setFeedbackMessage(error.response.data.error.message);
        setIsSuccess(false);
        setIsLoading(false);
      });
  };

  //Snack bar close Handler
  const snackbarHandleClose = () => {
    setIsSuccess(false);
  };

  //Login // Signup button that allows the user to navigate between logging in or signing up
  const changeFormMode = () => {
    setIsLogin(!isLogin);
  };

  //Navigate method
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/list`;
    navigate(path);
  };

  //Rendered Elements, Components
  return (
    <div className={classes.form}>
      <FormControl onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            width: isLogin ? 400 : 500,
            height: isLogin ? 400 : 600,
            "& .MuiTextField-root": { m: 1, width: "30ch" },
            backgroundColor: "#F0F0F0",
            "&:hover": {
              backgroundColor: "rgb(235,235,235)",
            },
            boxShadow: 3,
          }}
        >
          <div className={classes.company__Info}>
            <img
              src="https://i.ibb.co/jgBJMPL/car-Rental.png"
              alt="company logo"
            />
            <p>Car Rental</p>
          </div>

          {textFieldProperties.map((tf, index) => {
            return (
              tf && (
                <TextField
                  key={tf.id}
                  id={tf.id}
                  name={tf.name}
                  label={tf.label}
                  type={tf.type}
                  variant={tf.variant}
                  required={tf.required}
                  style={tf.style}
                  onChange={handleInputChange}
                />
              )
            );
          })}

          {!isLogin && (
            <Button variant="contained" component="label">
              Upload Photo
              <input
                type="file"
                name="photoURL"
                onChange={handleInputChange}
                hidden
              />
            </Button>
          )}
          <div className={classes.form__signLog}>
            <p>
              {isLogin ? "Create an Account?" : "Already have an Account ?"}
            </p>
            <Button variant="text" onClick={changeFormMode}>
              {!isLogin ? "Login" : "SignUp"}
            </Button>
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={
              !isLogin
                ? {
                    marginTop: 3,
                    width: 485,
                  }
                : {}
            }
          >
            {isLogin ? "Login" : "SignUp"}
          </Button>
          <CustomSnackBar
            snackbarHandleClose={snackbarHandleClose}
            isSuccess={isSuccess}
            feedbackMessage={feedbackMessage}
          />
        </Box>
      </FormControl>
      <LoadBackDrop open={isLoading} />
    </div>
  );
};

Auth.propTypes = {
  isLogin: PropTypes.bool,
};

export default Auth;
