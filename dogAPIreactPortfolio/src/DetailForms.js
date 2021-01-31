import React from "react";

export default class DetailForms extends React.Component {
    render(){
        return <>
            <br/>
            <form onSubmit={ this.props.formProps.handleCommentSubmit }>
                Submit a comment:
                <textarea onChange={ this.props.formProps.handleCommentChange } value={ this.props.formProps.newComment }></textarea>
                <input type='submit' value='Submit comment' />
            </form>
            
            <h3>Comments</h3>
            <div className="comments">
                <ul>
                    { this.props.formProps.comments.map(comment =>
                    <li key={ comment }>
                        { comment }
                    </li> )}
                </ul>
            </div>
        </>;
    }
}