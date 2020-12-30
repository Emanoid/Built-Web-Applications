import React from 'react';
import { Link } from 'react-router-dom';


const MainInterface = () => {

    const Chicklet = (props) => 
      <Link to={'/'+props.name}>
        <div id='chicklet'>
          {props.name}
        </div>
      </Link>
  
    return(
      <>
          <h1 id='header'>Inventory Applications</h1>
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