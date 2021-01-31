import React from "react";
import axios from 'axios';
import Chooser from "./Chooser.js";
import Details from "./Details.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dogs: [],
            current: undefined
        };
        
        this.chooseDog = this.chooseDog.bind(this);
    }
    
    componentDidMount() {
        axios.get(`https://dog.ceo/api/breeds/list/all`)
            .then(res=>{
                const arrayOfBreeds = Object.keys(res.data.message);
                this.setState({ dogs: arrayOfBreeds, current: arrayOfBreeds[0]});
            })
            .catch(error => console.log(error));
    }
    
    chooseDog(dog) {
        this.setState({ current: dog });
    }
    
    render(){
        return <> 
            <h1>Dog API Database Portfolio</h1>
            <div className="app">
                
                <Chooser dogs={ this.state.dogs } chooseDog={ this.chooseDog } />
                <Details current={ this.state.current } />
            </div>
        </>;
    }
}