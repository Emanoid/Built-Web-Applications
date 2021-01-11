import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './logout';
import { useAuth0 } from "@auth0/auth0-react";


const MainInterface = () => {

    const Chicklet = (props) => 
      <Link to={'/'+props.name}>
        <div id='chicklet'>
          {props.name}
        </div>
      </Link>

    const { user, isAuthenticated, isLoading } = useAuth0();

    return(
      <>  
          {/*Welcome 'Name Message'*/}
          <div className='logout_nav' id='headername'>
            {!isLoading && 
              isAuthenticated && 
              <h3>Welcome {user.name}!</h3>} 
          </div>
          {/*Application Title*/}
          {
            !isLoading && isAuthenticated ?
            <h1 className='logout_nav' id='headerauth'>Inventory Applications</h1> :
              <h1 className='logout_nav' id='headernotauth'>Inventory Applications</h1>
          }
          {/*Logout Button*/}
          <div className='logout_nav'>           
            <LogoutButton />
          </div>
          <br/><br/><br/>
          <Chicklet name='Shopping Counter' />
          <Chicklet name='Calculator' />
          <Chicklet name='BMI Calculator' />
          <Chicklet name='Dog API' />
          <Chicklet name='Emoji Picker' />
          <Chicklet name='Weather App' />
          <Chicklet name='News Browser App' />
          <Chicklet name='Something New' />
      </>
    );
  }

export default MainInterface;