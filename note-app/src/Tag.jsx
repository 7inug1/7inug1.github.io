import React, { Component } from 'react';

export default class Tag extends React.Component {
  render() {
    return <>
      <h1>All tags</h1>
        <button onClick={() => this.props.getNotesByTags()}>All</button> 
        
        {this.props.unduplicatedTagsArray.map((tag, key)=>
          <div key={key} id="tags">
            <button onClick={() => this.props.getNotesByTags(tag)}>{tag}</button> 
          </div>
        )}
        <br/>
      
      {/* 3. Filtered tags section */}
      <h1>Filtered tags</h1>
        {this.props.filteredTags.map((filteredTag, key)=>
          <button key={key} onClick={() => this.props.removeFilteredTags(key)}>{filteredTag}</button>
        )}
    </>
  }
}


