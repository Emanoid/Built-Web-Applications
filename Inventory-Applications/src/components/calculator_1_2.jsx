import React from 'react';
import '../css/calculator.css'
import {Link} from 'react-router-dom'
//Caculator Version 1.1
    //Added Delete Feature Completed
    //Added Command Chaining Completed
    //Documenting Program Completed
export default class Calculator_1_0 extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            result: '', //Variable for value on Output Screen
            funcClicked: '', //Variable for function to use
            pFuncClicked: '', //Variable for previous function used
            funcCall: false, //Variable indicating if last process was an onClick-function
            memory: []  //Variable to store values entered by users
        };

        //Binding All Created Functions to the Component
        this.onNumberClick = this.onNumberClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onResultLimit = this.onResultLimit.bind(this);
        this.onEqualsClick = this.onEqualsClick.bind(this);
        this.tempEqualsClick = this.tempEqualsClick.bind(this);
        this.onFunctionClick = this.onFunctionClick.bind(this);
        
    }

    //Calculator User Interface Skeleton. Designed in src/css/calculator.css
    Interface = () => {
        return (
            <>
                <h1>Calculator Application</h1>
                <Link to='/Home'>Home</Link><br/><br/>
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
    
    //To render the Interface on DOM
    render() { 
        return ( 
            <>
                <this.Interface />
            </>
         );
    }

    //To handle input limit on Display Screen
    //returns boolean indicating if input limit is reached
    onResultLimit(){
        let res = this.state.result;
        //input limit = 18 characters
        if (res != null && res.length > 18){
            res = 'true';
        }
        return (res !== 'true' ?  false : true);        
    }

    //To handle Number Clicks
    //updates State Output Screen with clicked numbers
    //Takes in the clicked number as parameter
    onNumberClick(e,numb){
        let maxreached = this.onResultLimit(); 
        let call = this.state.funcCall;
        let res = maxreached ? '# too long!' : 
            call ? String(numb) : 
                this.state.result + String(numb)

        call = call ? false : null;

        this.setState({
            result: res,
            funcCall: call
        });        
    }

    //To refresh Calculator when 'Clear' is clicked
    //Removes all stored inputs or functions
    onClearClick(){
        this.setState({
            result: '',
            funcClicked: '',
            pfuncClicked: '',
            memory: [],
            funcCall: false,
        });
    }

    //To remove most recent number input from Output Screen
    //updates Output screen with changes
    onDeleteClick(){
        let newResult = this.state.result;
        newResult = newResult.substring(0,newResult.length - 1);
        this.setState({
            result: newResult
        });
    }

    //To compute result using the previous function clicked
    //And return result
    tempEqualsClick(){
        let newres = this.state.result; //variable for final result so far
        let res = this.state.result; //variable for current result before this function was called
        let clicked = this.state.pFuncClicked;
        let temp = null; //To handle case if last clicked entry is one of (+,-,*,/) and not followed by a number (i.e '2 +' instead of '2 + 3')
        let storage = this.state.memory;
        if (res != null){
            if (clicked === 'Add'){
                newres = 0; // 0 + n = n
                temp = 0; //To save the final result so far, in case user enters incorrect syntax (i.e '2 +' instead of '2 + 3') temp will hold 2
                storage.map((numb) => temp+= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres+= numb);
            }
            if (clicked === 'Subtract'){
                newres = storage[0] * 2; // 2(n) - n = n
                temp = storage[0] * 2; //To save the final result so far, in case user enters incorrect syntax (i.e '2 -' instead of '2 - 3') temp will hold 2
                storage.map((numb) => temp-= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres-= numb);
            }
            if (clicked === 'Multiply'){
                newres = 1; // 1 * n = n
                temp = 1; //To save the final result so far, in case user enters incorrect syntax (i.e '2 *' instead of '2 * 3') temp will hold 2
                storage.map((numb) => temp*= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres*= numb);
            }
            if (clicked === 'Divide'){
                newres = Math.pow(storage[0],2); // n^2 / n = n
                temp = Math.pow(storage[0],2); //To save the final result so far, in case user enters incorrect syntax (i.e '2 /' instead of '2 / 3') temp will hold 2
                storage.map((numb) => temp/= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres/= numb);
            }
        }
        //To replace default error message with last entry
        //if user enters incorrect syntax like (i.e 2 +or-or*or/) without a second number, then it will return the first number instead of the default error
        newres = String(newres)
        newres = newres === 'NaN' ? temp : newres
        return newres;
    }

    //To handle all clicks on functions (i.e +,-,*,/)
    //updates memory with entry in Output Screen
    //Takes in selected function as a parameter
    onFunctionClick(e,func){
        this.setState({
            funcClicked: func,
            funcCall: true
        });
        let storage = this.state.memory;
        let res = this.state.result;
        let clicked = this.state.pFuncClicked;
        if (res != null){
            //If there exist a value in memory and a function is clicked
                //It takes the value in the Output Screen
                //and computes it with the value in memory using the 
                //previous function clicked
                //then updates memory with the result and displays on Output Screen
            //Else, it saves the value in the Output Screen to memory
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

    //To compute result using the current function clicked
    //And updates Output Screen with result 
    onEqualsClick(){
        let newres = this.state.result; //variable for final result so far
        let res = this.state.result; //variable for current result before this function was called
        let clicked = this.state.funcClicked;
        let temp = null; //To handle case if last clicked entry is one of (+,-,*,/) and not followed by a number (i.e '2 +' instead of '2 + 3')
        let storage = this.state.memory;
        if (res != null){
            if (clicked === 'Add'){
                newres = 0; // 0 + n = n
                temp = 0; //To save the final result so far, in case user enters incorrect syntax (i.e '2 +' instead of '2 + 3') temp will hold 2
                storage.map((numb) => temp+= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres+= numb);
            }
            if (clicked === 'Subtract'){
                newres = storage[0] * 2; // 2(n) - n = n
                temp = storage[0] * 2; //To save the final result so far, in case user enters incorrect syntax (i.e '2 -' instead of '2 - 3') temp will hold 2
                storage.map((numb) => temp-= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres-= numb);
            }
            if (clicked === 'Multiply'){
                newres = 1; // 1 * n = n
                temp = 1; //To save the final result so far, in case user enters incorrect syntax (i.e '2 *' instead of '2 * 3') temp will hold 2
                storage.map((numb) => temp*= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres*= numb);
            }
            if (clicked === 'Divide'){
                newres = Math.pow(storage[0],2); // n^2 / n = n
                temp = Math.pow(storage[0],2); //To save the final result so far, in case user enters incorrect syntax (i.e '2 /' instead of '2 / 3') temp will hold 2
                storage.map((numb) => temp/= numb);
                storage.push(parseFloat(res));
                storage.map((numb) => newres/= numb);
            }
        }
        //To replace default error message with last entry
        //if user enters incorrect syntax like (i.e 2 +or-or*or/) without a second number, then it will return the first number instead of the default error
        newres = String(newres)
        newres = newres === 'NaN' ? temp : newres

        this.setState({
            result: newres,
            memory: [],
        });
    }

}
 
