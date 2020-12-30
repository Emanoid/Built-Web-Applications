import React from 'react';
import {Link } from 'react-router-dom';
import '../css/news_browser.css';
import Logo from '../images/SSSG.jpg';
import LogoText from '../images/stn.png';

//Version of Browser with -Search, Delete and Filter Features

export default class News extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            storage: [],
            loading: true,
            maxItemId: 0,
            gotMaxItemId: false,
            itemId: 1,
            searchValue: '',
            displayXItems: 10,
        };

    }

    componentDidMount = () =>{
        let newMaxItemId = 0;
        let newData = this.state.data;

        //To Determine the number of stories to fetch
        const getData = (max) => {
            let res = 0;
            res = 10000 < max ? 10000 : 5000 < max ? 5000 : 1000 < max ? 1000 : 500 < max ? 500 : 100;
            return res;
        }

        fetch('https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty')    //To fetch max stories avaialble
            .then(async (maxItemId) => {
                if (maxItemId.ok){
                    newMaxItemId = await maxItemId.json();
                    this.setState({
                        maxItemId: newMaxItemId,
                        gotMaxItemId: true,
                        });
                    
                    for (let i = 1; i <= getData(newMaxItemId); i++){
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`) //To fetch Story Data
                        .then(async (data) => {
                            if (data.ok){
                                data = await data.json();
                                newData.push({id: this.state.itemId, data: data});
                                this.setState({
                                    loading: false,
                                    data: newData,
                                    storage: newData,
                                    itemId: this.state.itemId + 1,
                                });
                            }
                        })
                    }
                  
                }
                })
            .catch(e => console.log('Connection error', e))
             
    }

    Navbar = () => {
        return (
            <>
                <nav id='navi'>
                        <img src={Logo} alt='logo' width={60} height={60} id='navlogo' />
                        <Link to='/' id='navitems'>Home</Link>
                        <img src={LogoText} alt='logo' width={250} height={60} id='navlogo' />
                        <input id='search-tech' value={this.state.searchValue} onChange={(e) => this.handleValueChange(e)} onKeyDown={(e)=>this.onEnterSumbit(e)} type='text' placeholder='Search by title, url, author or points....' />
                </nav>
                <br/><br/><br/><br/>
            </>
        );
    }

    Story = ({id,title='No Title',url,by='Unknown Author',score=0}) => {

        return (
            <div id='story'>
                <div id='story-text'>
                    {title} (<a href={url} target="_blank" >Access Link</a>) <br/>
                    {`${score} points  |  ${by}`}
                </div>
                <button id='delete' onClick={(e)=>this.onDeleteClick(id)}>x</button>
            </div>
        );
    }


    render(){
        var { data, displayXItems, maxItemId } = this.state;
        let displayData = data.slice(0, displayXItems);
        return (
            this.state.loading ?
            <>Loading ...</>
            :
            <>
                <this.Navbar /> 
                <label for='filter' id="filter-text">Filter Output: </label>
                <select name="filter" id="filter" onChange={this.handleFilterChange}>
                    <option value={10}>0-10</option>
                    <option value={20}>0-20</option>
                    <option value={30}>0-30</option>
                    <option value={50}>0-50</option>
                    <option value={maxItemId}>0-End</option>
                </select><br/>
                {displayData.map((item) => {
                    return (
                        <this.Story key={item.id} id={item.id} title={item.data.title} url={item.data.url} by={item.data.by} score={item.data.score}/>
                           );
                })}
            </>
        );
        
    }

    handleValueChange = (e) => {
        let newValue = e.target.value;
        this.setState({
            searchValue: newValue,
        });
    }

    onDeleteClick = (id) => {
        let newData = this.state.data;
        newData = newData.filter(item => item.id !== id);
        this.setState({
            data: newData,
        });
    }

    handleFilterChange = () => {
        let num = document.getElementById('filter').value
        this.setState({
            displayXItems: num,
        });
    }

    //Handles Enter Key Sumbit from Search Bar
    onEnterSumbit = (e) => {
        let value = this.state.searchValue.toLowerCase();
        const handleEmptyView = (data) => {
            return data.length === 0 ? this.state.storage : data;
        }
        
        if (value !== ''){
            if (e.keyCode === 13) {
                let data = this.state.data;
                let newData = [];         

                //Check if searched value is in title of any story
                for(let i=0; i < data.length; i++){
                    if (data[i].data.title !== undefined && 
                        data[i].data.url !== undefined && 
                        data[i].data.by !== undefined && 
                        data[i].data.score !== undefined && 
                        (data[i].data.title.toLowerCase().includes(value) ||
                        data[i].data.url.toLowerCase().includes(value) ||
                        data[i].data.by.toLowerCase().includes(value) ||
                        String(data[i].data.score).toLowerCase().includes(value) )
                         ){
                        newData.push(data[i]);
                    }
                }                

                newData = handleEmptyView(newData);
                this.setState({
                    data: newData,
                });
            }}
        else{
            this.setState({
                data: this.state.storage,
            });
        }


    }

}