import React from "react";

export default class Chooser extends React.Component {
    
    render(){
        return <> 
            <div className="chooser">
                <h2 id="chooserTitle">Choose a dog</h2>
                <ul id="chooserItems">
                    { this.props.dogs.map(dog =>
                        <li key={dog}>
                            <button id="chooserButton" onClick={ () => this.props.chooseDog(dog) }>
                                {dog}
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </>;
    }
}