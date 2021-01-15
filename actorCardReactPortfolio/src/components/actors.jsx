import React, { Component } from 'react';
import Actor from './actor';
import axios from "axios";

class Actors extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      actors: [
        // { id: 1, name: 'Brad Pitt', starredMovie: ['Fight Club'], cityOfOrigin: 'Shawnee' },
        // { id: 2, name: 'Tom Cruise', starredMovie: ['Mission Impossible', 'Top Gun'], cityOfOrigin: 'Syracuse'},
      ],
      cityList: []
    }
    // this.getCities = this.getCities.bind(this);
    // this.handleActorRaisedCityChange = this.handleActorRaisedCityChange.bind(this);
  }

  
  // state = {
  //   actors: [
  //     { id: 1, name: 'Brad Pitt', starredMovie: ['Fight Club'], cityOfOrigin: 'Shawnee' },
  //     { id: 2, name: 'Tom Cruise', starredMovie: ['Mission Impossible', 'Top Gun'], cityOfOrigin: 'Syracuse'},
  //   ],
  //   // cities: ''
  // };

  formRef = React.createRef();
  inputRef = React.createRef();

  // getCities(){
  componentDidMount(){
    axios.get(`https://api.teleport.org/api/urban_areas/`)
      .then(results => {
        let tempCityArray = [];

        for(let i = 0; i < results.data._links['ua:item'].length; i++){
            // console.log((results.data._links['ua:item'][i].name))
            tempCityArray.push(results.data._links['ua:item'][i].name)
        }
        console.log("tempCityArray: " + tempCityArray)
        this.setState({
          cityList: tempCityArray
        });
      });
  }

  onAdd = actorName => {
    const actors = [...this.state.actors, { id: Date.now(), name: actorName, starredMovie: undefined, cityOfOrigin: undefined }];
    this.setState({ actors });
  };
  
  onSubmit = event => {
    event.preventDefault();
    const actorName = this.inputRef.current.value;
    actorName && this.onAdd(actorName);
    this.formRef.current.reset();
  };

  render() {
    return <>
      <h1>Actor Card Project</h1>

      <Actor actors={this.state.actors}/>

      <form ref={this.formRef} className="add-form" onSubmit={this.onSubmit}>
        <input
          ref={this.inputRef}
          type="text"
          className="actorNameInputbox"
          placeholder="Actor Name"
        />
        <button className="add-button">Add</button>
      </form>
      <button onClick={this.getCities}>Get Cities</button>
      {/* {this.cities.map((city)=><option key={city} value={city}> {city} </option>)} */}
      
      {/* <div id="citiesDropdown">
        <label for="cities">Your favourite actor's city of origin: &nbsp; </label>
            <select id="cities" name="cities" onChange={this.handleActorRaisedCityChange}> 
              <option hidden selected value> ---------- select a city ---------- </option>
              <option value="other"> Other </option> 
              {this.state.cityList.map((city)=><option key={city} value={city}> {city} </option>)}
            </select>
            <br/><br/>
      </div> */}


      <div id="citiesDropdown">
        <label for="cities">Your favourite actor's city of origin: &nbsp; </label>
          <select id="cities" name="cities" onChange={this.props.handleActorRaisedCityChange}> 
            <option hidden selected value> ---------- select a city ---------- </option>
            <option value="other"> Other </option> 
            {this.state.cityList.map((city)=><option key={city} value={city}> {city} </option>)}
          </select><br/><br/>
      </div>
        
    
    </>;
  }
}

export default Actors;