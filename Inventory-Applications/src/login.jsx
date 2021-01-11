import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const style = {textAlign: 'center'}

  return (
    <>
      <br/><br/><br/><br/>
      <h1 style={style} >Welcome to The Inventory Application</h1>
      <button id='login' onClick={() => loginWithRedirect()}>Log In</button>
    </>
  );
  
};

export default LoginButton;


