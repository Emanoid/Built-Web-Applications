import React from 'react';
import '../css/bmi_calculator.css';
import Graph from '../images/bmi-graph.jpg';
import {Link} from 'react-router-dom'

export default class BMI extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            metricScale: true,
            bmi: '0.0',
            buttonClicked: false,
            data: {
                heightCentimeters: 0,
                heightImperial: 0,
                heightFeet: 0,
                heightInches: 0,
                weightKg: 0,
                weightIbs: 0
            }
        };

    }

    onSelectScale = () => { 
        this.setState({
            metricScale: !this.state.metricScale,
        });
    }

    onGetRangeClick = () => {
        this.setState({
            buttonClicked: !this.state.buttonClicked
        });
    }

    updateParaCentimeters = (e) => {
        let input = e.target;
        let hCentimeters = input.id === 'height-Centimeters' ? parseFloat(input.value) : this.state.data.heightCentimeters ;
        let hFeet = input.id === 'height-feet' ? parseFloat(input.value) : this.state.data.heightFeet ;
        let hInches = input.id === 'height-inches' ? parseFloat(input.value): this.state.data.heightInches ;
        let hImperial = (hFeet * 12) + hInches;
        let wKg = input.id === 'weight-kg' ? parseFloat(input.value): this.state.data.weightKg ;
        let wIbs = input.id === 'weight-ibs' ? parseFloat(input.value) : this.state.data.weightIbs ;
        let newData = this.state.data;
        newData.heightCentimeters = hCentimeters;
        newData.heightImperial = hImperial;
        newData.heightFeet = hFeet;
        newData.heightInches = hInches;
        newData.weightKg = wKg;
        newData.weightIbs = wIbs;
        this.setState({
            data: newData
        });
        
        this.computeBmi();
    }

    computeBmi = () => {
        let newBmi = 0;
        let hCentimeters = this.state.data.heightCentimeters;
        let hImperial = this.state.data.heightImperial;
        let wKg = this.state.data.weightKg;
        let wIbs = this.state.data.weightIbs;

        newBmi = this.state.metricScale ? (wKg / ((hCentimeters/100) * (hCentimeters/100))) :
                                            (703 * (wIbs / (hImperial * hImperial)));
        newBmi = String(newBmi.toFixed(1));
        newBmi = newBmi === 'NaN' ? 'Invalid Entry' : newBmi;
        
        this.setState({
            bmi: newBmi
        });

    }

    Interface = () => {
        return (
            <>
                <div id='card'>
                    <div id='top-section'>
                        <h1>BMI CALCULATOR</h1>
                        <Link to='/Home'>Home</Link>
                        <h5>Unit of measurement:</h5>
                        <form>
                            <input type='radio' id='metric' name='scale' onClick={this.onSelectScale} defaultChecked/>
                            <label>Metric &nbsp; &nbsp;</label>
                            <input type='radio' id='imperial' name='scale' onClick={this.onSelectScale} />
                            <label>Imperial</label> 
                            
                            <br /><br />
                            <h5>Height</h5>
                            {
                            !this.state.metricScale ? 
                                <>
                                    <input type='text' id='height-feet' placeholder='0' onChange={(e) => this.updateParaCentimeters(e)}/> 
                                    <input type='text' id='height-inches' placeholder='0' onChange={(e) => this.updateParaCentimeters(e)}/> <br />
                                    feet &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                                    &nbsp; &nbsp; &nbsp; inches
                                </>  :
                                <>
                                    <input type='text' id='height-Centimeters' placeholder='0' onChange={(e) => this.updateParaCentimeters(e)}/> <br/>
                                    Centimeters
                                </>
                            }                        
                            <br /><br />
                            <h5>Weight</h5>
                            {
                                !this.state.metricScale ? 
                                <>
                                    <input type='text' id='weight-ibs' placeholder='0' onChange={(e) => this.updateParaCentimeters(e)}/> <br/>
                                    Ibs
                                </> :
                                <>
                                    <input type='text' id='weight-kg' placeholder='0' onChange={(e) => this.updateParaCentimeters(e)}/><br/>
                                    Kg
                                </>
                            }
                        </form><br/>
                        <h4>BMI:</h4>
                        <div id='bmi'>{this.state.bmi} </div>
                        <label>Normal weight: 18.5 - 24.9</label><br/><br/>
                        <button id='getRange' onClick={this.onGetRangeClick}>SEE MY RANGE!</button><br/><br/><br/>
                    </div>
                    <div>
                        {this.state.buttonClicked ? chart : null}
                    </div>
                </div>
            </>
        );
    }

    render(){
        return(
            <>
                <this.Interface />

            </>
        );
        
    }
}

const chart = <img src={Graph} alt='BMI Chart' width='850' />;