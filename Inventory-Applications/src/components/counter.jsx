import * as React from 'react';
import {Link} from 'react-router-dom'

export default class Counter extends React.Component {
    constructor(props){
        super(props)

        this.state = { 
            counters: [{id: 1, count: 0}],
            maxId: 1,
            numCounters: 1,
            activeCounters: 0
        };

        this.incCounters = this.incCounters.bind(this);
        this.decCounters = this.decCounters.bind(this);
        this.reset = this.reset.bind(this);
        this.incCounter = this.incCounter.bind(this);
        this.decCounter = this.decCounter.bind(this);

    }

    buildCounter = (props) => {
        return (
        <div>
            {props.counter.count !== 0? <button id='countreg'>{props.counter.count}</button> : <button id='countzero'>zero</button>}
            <button id='increment' onClick={(e, id) => this.incCounter(e,props.counter.id)}>+</button>

            {props.counter.count !== 0 ? <button id='decrement' onClick={(e, id) => this.decCounter(e,props.counter.id)}>-</button> :
             <button id='inactivedecrement' onClick={(e, id) => this.decCounter(e,props.counter.id)}>-</button> }

            <button id='Decrement' onClick={(e, id) => this.decCounters(e, props.counter.id)}>Delete</button>
        </div> );
    }

    makeCounter = () => {
        return (
            this.state.counters.map((counter) => {
                return(
                <this.buildCounter key={counter.id} counter={counter}/> 
                )
            })
        );       
    }

    getActiveCounters = () => {
        let newCounters = this.state.counters;
        let res = 0;
        newCounters.map((contact) => (contact.count > 0 ? res++ : null));

        this.setState({
            activeCounters: res
        })
    }

    render() {    
        return ( 
            <>
                <h1>Shopping Cart Counter</h1>
                <nav id='nav' >
                <Link to='/Home'>&nbsp; Home &nbsp;</Link>
                    Navbar &nbsp;
                    <button id='navnum'>{this.state.activeCounters}</button>

                </nav>
                <button id='Reset' onClick={this.reset}>Reset</button>
                <button id='Increment' onClick={this.incCounters}>Add</button>
                {this.makeCounter()}
                
            </>
         );
    }

    incCounters(){
        let newCounter = {id: this.state.maxId + 1, count: 0};
        let newCounters = this.state.counters;
        newCounters.push(newCounter);

        this.setState({
            counters: newCounters,
            maxId: this.state.maxId + 1,
            numCounters: this.state.numcounters + 1
            }) 
        this.getActiveCounters();
    }

    decCounters(e,id){
        let newCounters = this.state.counters;
        newCounters = newCounters.filter((counter) => counter.id !== id);

        this.setState({
            counters: newCounters,
            numCounters: this.state.numcounters - 1
            }) 
        this.getActiveCounters();
    }

    reset(){
        let newCounters = this.state.counters;
        newCounters.map((counter) => counter.count = 0)

        this.setState({
            counters: newCounters
        })
        this.getActiveCounters();
    }

    incCounter(e,id){
        let newCounters = this.state.counters;
        newCounters.map((counter) => counter.id === id ? counter.count++ : null);

        this.setState({
            counters: newCounters
        })        

        this.getActiveCounters();
    }

    decCounter(e,id){
        let newCounters = this.state.counters;
        newCounters.map((counter) => (counter.id === id && counter.count !== 0)? counter.count-- : null);

        this.setState({
            counters: newCounters
        })        

        this.getActiveCounters();
    }
}
 
