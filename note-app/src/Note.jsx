import React, { Component } from 'react';

export default class Note extends React.Component {
  render() {
    return <>
      <h1>Notes</h1>
      {this.props.filteredNotes.map((filteredNote, key)=>
        <div className="note-individual" key={key}>
          <h3> 
            Title: {filteredNote.title} 
          </h3>

          <h3> 
            Tag: 
            {filteredNote.tag.map((tag, key)=>
              <li key={key}>{key+1}. {tag}</li>
            )} 
          </h3>

          <h3> 
            Content: {filteredNote.content} 
          </h3>
        </div>
      )}
    </>
  }
}

