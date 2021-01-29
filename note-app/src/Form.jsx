import React, { Component } from 'react';

export default class Form extends React.Component{
  render(){
    return <> 
        <form name="newNoteForm" onSubmit={this.props.submitNewNote}>
          <fieldset>
          <legend>New Note</legend>
            <label>
            Title:
              <input type="text" name="title" onChange={this.props.handleNewNoteTitleChange}/>
            </label><br/>

            <label>
            Tag:
              <input type="text" name="tag" onKeyUp={this.props.addTags} placeholder="Press shift to add tags" size="80"/>
            </label><br/>
            <ul>
              {this.props.newNoteTags.map((newNoteTag, key)=>
                <li key={key}>
                  {/* <h1>key: {key}</h1> */}
                  <span>{newNoteTag}</span>
                  <button onClick={(event)=>this.props.removeTags(event, key)}>X</button>
                </li>
              )}
            </ul>

            <label>
            Content:
              <textarea type="textarea" name="content" onChange={this.props.handleNewNoteContentChange}/>
            </label><br/>

            <button >Submit</button>
            </fieldset>
        </form>
      <br/>
      
      </>;
    }
}
