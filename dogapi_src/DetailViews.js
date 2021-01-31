import React from "react";

export default class DetailViews extends React.Component {
    
    render(){
        return <>
            <h2>{ this.props.formProps.current }</h2>
                <div className="detailviews">
                <div className="images">
                <form>
                    <label>
                        number of images:
                        <input type='number' min='0' max={ this.props.formProps.images.length } value={ this.props.formProps.number } onChange={ this.props.formProps.handleNumberChange }/>
                    </label>
                </form>
                    <ul>
                        { this.props.formProps.images.slice(0, this.props.formProps.number).map(image=>
                        <li key={ image }>
                            <img src={ image } alt="Dog Image" />
                        </li> )}
                    </ul>
                </div>
            </div> 
        </>;
    }
}