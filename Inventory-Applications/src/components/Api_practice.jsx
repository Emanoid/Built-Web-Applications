import React from 'react';
import {Link} from 'react-router-dom'

export default class Api extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            items: [],
            isLoaded: false,

         };
    }

    componentDidMount(){
        fetch('https://dog.ceo/api/breeds/image/random/40')
            .then(data => data.json())
            .then(data => this.setState({
                items: data,
                isLoaded: true
            }))
    }

    render() { 

        var { items, isLoaded} = this.state;
        if (!isLoaded){
            return <div>Loading...</div>
        }
        else{
            return (
                <div>
                    <Link to='/'>Home</Link>
                    <ul>
                        {items.message.map((dog,i) => {
                            return (<>
                                    <li key={i}><img src={`${dog}`} alt={`${items.status}`} /> </li>
                                    </>
                                    )
                        }
                            )}
                    </ul>
                </div>
            );
        }

    }
}
 
