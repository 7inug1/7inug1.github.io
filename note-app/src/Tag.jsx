import React, { Component } from 'react';

export default class Tag extends React.Component {
  render() {
    return <>
      <div id="tags">
        <div id="all-tags">
          <h1>All tags</h1>
            {/* All Button */}
            <button onClick={() => this.props.getNotesByTags()}>All</button> 
            
            {/* Rest of the buttons */}
            {this.props.unduplicatedTagsArray.map((tag, key)=>
              <div key={key} id="tags">
                <button onClick={() => this.props.getNotesByTags(tag)}>{tag}</button> 
              </div>
            )}
            <br/>
        </div>

        <div id="filtered-tags">
          <h1>Filtered tags</h1>
            {this.props.filteredTags.map((filteredTag, key)=>
              <button key={key} onClick={() => this.props.removeFilteredTags(key)}>{filteredTag}</button>
            )}
        </div>
      </div>
    </>
  }
}


