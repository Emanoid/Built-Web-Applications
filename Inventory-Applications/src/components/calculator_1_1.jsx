import React from 'react';
import '../css/calculator.css'
import {Link} from 'react-router-dom'
//Caculator Version 1.1
    //Add Delete Feature Completed
    //Add Command Chaining Completed
export default class Calculator_1_0 extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            result: '',
            funcClicked: '',
            pFuncClicked: '',
            funcCall: false,
            memory: []
        };

        this.onNumberClick = this.onNumberClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onResultLimit = this.onResultLimit.bind(this);
        this.onEqualsClick = this.onEqualsClick.bind(this);
        this.tempEqualsClick = this.tempEqualsClick.bind(this);
        this.onFunctionClick = this.onFunctionClick.bind(this);
        
    }

    //Calculator UI
    Interface = () => {
        return (
            <>
                <button id='result'>{this.state.result}</button>
                <br/>
                <button className='key' id='key1' onClick={(e) => this.onNumberClick(e,7)}>7</button>
                <button className='key' id='key2' onClick={(e) => this.onNumberClick(e,8)}>8</button>
                <button className='key' id='key3' onClick={(e) => this.onNumberClick(e,9)}>9</button>
                <button className='key' id='key4' onClick={(e) => this.onFunctionClick(e,'Divide')}>/</button><br/>
                <button className='key' id='key5' onClick={(e) => this.onNumberClick(e,4)}>4</button>
                <button className='key' id='key6' onClick={(e) => this.onNumberClick(e,5)}>5</button>
                <button className='key' id='key7' onClick={(e) => this.onNumberClick(e,6)}>6</button>
                <button className='key' id='key8' onClick={(e) => this.onFunctionClick(e,'Multiply')}>*</button><br/>
                <button className='key' id='key9' onClick={(e) => this.onNumberClick(e,1)}>1</button>
                <button className='key' id='key10' onClick={(e) => this.onNumberClick(e,2)}>2</button>
                <button className='key' id='key11' onClick={(e) => this.onNumberClick(e,3)}>3</button>
                <button className='key' id='key12' onClick={(e) => this.onFunctionClick(e,'Add')}>+</button><br/>
                <button className='key' id='key13' onClick={(e) => this.onNumberClick(e,'.')}>.</button>
                <button className='key' id='key14' onClick={(e) => this.onNumberClick(e,0)}>0</button>
                <button className='key' id='key15' onClick={this.onEqualsClick}>=</button>
                <button className='key' id='key16' onClick={(e) => this.onFunctionClick(e,'Subtract')}>-</button><br/>
                <button className='key' id='key17_1_1' onClick={this.onClearClick}>Clear</button>
                <button className='key' id='key18' onClick={this.onDeleteClick}>Del</button>
            </>
        );
    }
    

    render() { 
        return ( 
            <>
                <Link to='/Home'>Home</Link>
                <this.Interface />
            </>
         );
    }

    onNumberClick(e,numb){
        let maxreached = this.onResultLimit();
        let call = this.state.funcCall;
        let res = maxreached ? '# too long!' : 
            call ? String(numb) : 
                this.state.result + String(numb)

        call = call ? false : null

        this.setState({
            result: res,
            funcCall: call
        });        
    }

    onClearClick(){
        this.setState({
            result: '',
            funcClicked: '',
            pfuncClicked: '',
            memory: [],
            funcCall: false,
        });
    }

    onDeleteClick(){
        let newResult = this.state.result;
        newResult = newResult.substring(0,newResult.length - 1);
        this.setState({
            result: newResult
        });
    }

    onResultLimit(){
        let res = this.state.result;
        if (res != null && res.length > 18){
            res = 'true';
        }
        return (res !== 'true' ?  false : true);        
    }

    onFunctionClick(e,func){
        this.setState({
            funcClicked: func,
            funcCall: true
        });
        let storage = this.state.memory;
        let res = this.state.result;
        let clicked = this.state.pFuncClicked;
        if (res != null){
            if (storage.length === 1 && clicked !== ''){
                res = this.tempEqualsClick();
                storage = [];
                storage.push(parseFloat(res));
            }
            else{
                storage.push(parseFloat(res));
                res = '';
            }
        }
        this.setState({
            result: res,
            memory: storage,
            pFuncClicked: func
        });
    }


    onEqualsClick(){
        let newres = this.state.result;
        let res = this.state.result;
        let clicked = this.state.funcClicked;
        let temp = null;
        let storage = this.state.memory;
        if (res != null){
            if (clicked === 'Add'){
                newres = 0;
                temp = 0;
                storage.map((numb) => temp+= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres+= numb);
            }
            if (clicked === 'Subtract'){
                newres = storage[0] * 2;
                temp = storage[0] * 2;
                storage.map((numb) => temp-= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres-= numb);
            }
            if (clicked === 'Multiply'){
                newres = 1;
                temp = 1;
                storage.map((numb) => temp*= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres*= numb);
            }
            if (clicked === 'Divide'){
                newres = Math.pow(storage[0],2);
                temp = Math.pow(storage[0],2);
                storage.map((numb) => temp/= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres/= numb);
            }
        }
        newres = String(newres)
        newres = newres === 'NaN' ? temp : newres

        this.setState({
            result: newres,
            memory: [],
        });
    }

    tempEqualsClick(){
        let newres = this.state.result;
        let res = this.state.result;
        let clicked = this.state.pFuncClicked;
        let temp = null;
        let storage = this.state.memory;
        if (res != null){
            if (clicked === 'Add'){
                newres = 0;
                temp = 0;
                storage.map((numb) => temp+= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres+= numb);
            }
            if (clicked === 'Subtract'){
                newres = storage[0] * 2;
                temp = storage[0] * 2;
                storage.map((numb) => temp-= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres-= numb);
            }
            if (clicked === 'Multiply'){
                newres = 1;
                temp = 1;
                storage.map((numb) => temp*= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres*= numb);
            }
            if (clicked === 'Divide'){
                newres = Math.pow(storage[0],2);
                temp = Math.pow(storage[0],2);
                storage.map((numb) => temp/= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres/= numb);
            }
        }
        newres = String(newres)
        newres = newres === 'NaN' ? temp : newres
        return newres;
    }

}
 
