import React, { useState,useContext } from "react";
import Input from "../../shared/components/UIElements/Input";
import Button from "../../shared/components/UIElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { useForm } from "../../shared/components/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import "./Auth.css";

const Auth = () => {
    const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading,error,sendRequest, clearError} = useHttpClient();
 
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {   
            ...formState.inputs,
            name: undefined 
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
    else{
        setFormData({
            ...formState.inputs,
            name:{
                value: '',
                isValid:false
            }
        },false)
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if(isLoginMode){
      try{
         const responseData = await sendRequest('http://localhost:5000/api/users/login','POST',JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
          {
            'Content-Type': 'application/json'
          }
        );
        
        auth.login(responseData.user.id);
       
       }
        catch(err){
         
        }
    }
    else{
      try{
     const responseData = await sendRequest('http://localhost:5000/api/users/signup','POST',JSON.stringify({
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      }),
        {
          'Content-Type': 'application/json'
        },
       );
      
      auth.login(responseData.user.id);
     
     }
      catch(err){
      }
    }
   
  };

 

  return (
    <React.Fragment>
    <ErrorModal error = {error} onClear = {clearError}/>
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay/>}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, atleast 5 characters"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SINGUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SINGUP" : "LOGIN"}
      </Button>
    </Card>
    </React.Fragment>
  );
};

export default Auth;
