import React, { Component } from 'react';

class Actor extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <>
        <ul>
          {this.props.actors.map(actor => (
            <div>
              <h1>{actor.name}</h1>
              {/* <h2>{actor.starredMovie}</h2>
              <h2>{actor.cityOfOrigin}</h2> */}
            </div>
          ))}
        </ul>
      </>
    );
  }
}

export default Actor;