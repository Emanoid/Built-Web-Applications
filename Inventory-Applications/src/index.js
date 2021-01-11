import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from 'react-router-dom/Route';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
//Components Built so far
import MainInterface from './components/main_interface';
import Counter from './components/counter';
//import Calculator_1_0 from './components/calculator_1_0';
//import Calculator_1_1 from './components/calculator_1_1';
import Calculator_1_2 from './components/calculator_1_2';
import Emoji from './components/emoji_picker';
import BMI from './components/bmi_calculator_1_0';
import Api from './components/Api_practice';
import Weather from './components/weather_app_1_0';
//import News_1_0 from './components/news_browser_1_0'
//import News_1_1 from './components/news_browser_1_1'
import News_1_2 from './components/news_browser_1_2';
import LoginButton from './login';
import Whoops404 from './components/not_found';
//User Authentication
import { Auth0Provider } from "@auth0/auth0-react";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Switch>
          <Route exact path="/Home" component={MainInterface} />
          <Route exact path="/" component={LoginButton} />
          <Route exact path="/Shopping Counter" component={Counter} />
          <Route exact path="/Calculator" component={Calculator_1_2} />
          <Route exact path="/BMI Calculator" component={BMI} />
          <Route exact path="/Dog API" component={Api} />
          <Route exact path="/Emoji Picker" component={Emoji} />
          <Route exact path="/Weather App" component={Weather} />
          <Route exact path="/News Browser App" component={News_1_2} />
          <Route exact path="/Something New" component={News_1_2} />
          <Route path="*" component={Whoops404} />
          </Switch>
        </Routes>
      </div>
    </>
  );
}

ReactDOM.render(
  <Router>
    <Auth0Provider
    domain="dev-6uljp-3j.us.auth0.com"
    clientId="6fsv4qBYqsBywVSWOR8hvDHcLCbwVvzz"
    redirectUri='http://localhost:3000/Home'
    >
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById('root')
);
