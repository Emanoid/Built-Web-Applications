import React from 'react';
import '../css/weather_app.css';
import Clear from '../images/sunny.JPG';
import Thunderstorm from '../images/stormy.JPG';
import Rain from '../images/rainy.JPG';
import Snow from '../images/snowy.JPG';
import Clouds from '../images/clowdy.JPG';
import CityDatabase from '../json/cities.json';
import { Link } from 'react-router-dom';

export default class Weather extends React.Component {
    constructor(props){
        super(props);

        this.state = {  
            data: [],
            loading: true,
            cityId: 1,
            cities: [],
            searchValue: '',
            validSearchValue: true,
            scale: 'Farenheit',
            notFound: false,
        };

    }

    componentDidMount(){
        var newData = [];
        var cities = this.state.cities;
        var units = (this.state.scale === 'Farenheit' ?
                    'Imperial' : 'Metric');
        cities.map(item => {
            fetch(mainLink+'&'+'appid='+apiKey+'&'+'units='+units+'&'+'q='+item.city)
            .then(async (data) => {
                if (data.ok){
                    data = await data.json()
                    newData.push({id: item.id, data: data}) &&
                    this.setState({
                        loading: false,
                        data: newData,
                        notFound: false,
                        }) 
                }
                else{
                    this.setState({
                        notFound: true
                    })
                }
                })
            .catch(e => console.log('Connection error', e))
        })
    }

    WeatherCard = (props) => {
        return (
            <>
                <div className='card'>
                    <button id='delete' onClick={(e)=>this.onDeleteClick(props.id)}>x</button>
                    <div id='day'>{props.day}</div>
                    <img src={props.image} alt={props.weather} id='icon'/>
                    <div className='container'>
                        <><div id='htext'>{props.high}&#176; &nbsp;</div> <div id='text'>{props.low}&#176;</div></><br/>
                    </div>
                    <div id='container'>
                        <div id='regtext'>{props.weather}</div>
                        <div id='regtext'>City: {props.name}</div>
                    </div>
                </div>
            </>)
    }

    weatherForcast = () => {
        var { data } = this.state;
        var date = new Date();
        return (
            <>
                <h1 id='header'>Weather App</h1>
                <Link to='/'>Home</Link>
                <div id='details'>Date/Time: {String(date).substring(3,(String(date).length))}</div><br/>
                <div id='details'>
                    Temperature Scale: &nbsp;
                    <div className="dropdown">
                        <button className="dropbtn">{this.state.scale}</button>
                        <div className="dropdown-content">
                            <div onClick={this.onChangeScale}>
                                {this.state.scale === 'Farenheit' ?
                                    'Celcius' : 'Farenheit'
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <>
                    <input id='search' onKeyDown={(e)=>this.onEnterSumbit(e)} value={this.state.searchValue} onChange={(e) => this.handleValueChange(e)} type='text' placeholder='Enter City...' />
                    <button id='search-button' onClick={this.onEnterCity}>Get Weather</button>
                    {(this.state.validSearchValue && !this.state.notFound) ? 
                        null :
                        <div id='errortext'>{this.state.searchValue} is an Invalid City! Please try again.</div>}
                </><br/>
                {data.map((item) => {
                    return(
                        <this.WeatherCard day={(String(date)).substring(0,3)}
                                        weather={item.data.weather[0].main === 'Thunderstorm'? 'Stormy' : item.data.weather[0].main }
                                        image= {matchWeather(item.data.weather[0].main)} 
                                        high={item.data.main.temp_max.toFixed(0)}
                                        low={item.data.main.temp_min.toFixed(0)}
                                        name={item.data.name}
                                        id={item.id}
                                        key={item.id}
                                />
                    );
                })}
            </>
        );
    }

    //Handles Enter Key Sumbit from Search Bar
    onEnterSumbit = (e) => {
        if (e.keyCode === 13) {
            this.onEnterCity();
        }
    }

    onChangeScale = () => {
        let scale = this.state.scale;
        scale = scale === 'Farenheit' ? 'Celcius' : 'Farenheit';
        this.setState({
            scale: scale,
        });
    }
    
    onDeleteClick = (id) => {
        let {data,cities} = this.state;
        cities = cities.filter((item) => item.id !== id);
        data = data.filter((item) => item.id !== id);
        this.setState({
            cities: cities,
            data: data,
        });
    }

    handleValueChange = (e) => {
        let newValue = e.target.value;
        this.setState({
            searchValue: newValue,
        });
    }

    onEnterCity = () => {
        let {cities,cityId,searchValue} = this.state;

        //To determine if Entered City is valid
        let validCity = false;
        for (let i=0; i<CityDatabase.length; i++){
            if (CityDatabase[i].country.toLowerCase().includes(searchValue.toLowerCase()) ||
                CityDatabase[i].name.toLowerCase().includes(searchValue.toLowerCase())){
                    validCity = true;
                    i = CityDatabase.length;
                }
            }

        let newCity = {id: cityId, city: searchValue};
        if (validCity) {
            cities.push(newCity);
            this.setState({
                cities: cities,
                cityId: cityId + 1,
                searchValue: '',
                validSearchValue: 'true'
            });
            this.componentDidMount();
        }
        else{
            this.setState({
                validSearchValue: false,
            });   
        }         
    }

    render() { 
        return (  
            /*this.state.loading ? 
            (
                <>Loading....</>
            ) :
            (*/
            <>
                {this.weatherForcast()}
            </>
            
        );
    }
}


const apiKey = '81775330c1f608b888a76875fb22ae26';
const mainLink = 'http://api.openweathermap.org/data/2.5/weather?';

const matchWeather = (weather) => {
    return (
        weather === 'Clear' ? Clear : 
        weather === 'Thunderstrom' ? Thunderstorm :
        weather === 'Rain' ? Rain :
        weather === 'Snow' ? Snow :
        weather === 'Clouds' ? Clouds : null
    );
}