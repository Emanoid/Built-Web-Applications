import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import News_1_2 from './components/news_browser_1_2'

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" component={MainInterface} />
          <Route exact path="/Shopping Counter" component={Counter} />
          <Route exact path="/Calculator" component={Calculator_1_2} />
          <Route exact path="/BMI Calculator" component={BMI} />
          <Route exact path="/Dog API" component={Api} />
          <Route exact path="/Emoji Picker" component={Emoji} />
          <Route exact path="/Weather App" component={Weather} />
          <Route exact path="/News Browser App" component={News_1_2} />
          <Route exact path="/Something New" component={News_1_2} />
          
        </Routes>
      </div>
    </>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
