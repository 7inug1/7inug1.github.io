import React, { Component } from 'react';

export default class Tag extends React.Component {
  render() {
    return <>
      <div id="tags">
        <div id="allTags">
          <h2>All tags</h2>
            {/* All Button */}
            <button onClick={() => this.props.getNotesByTags()}>All</button> 
            
            {/* Rest of the buttons */}
            {this.props.unduplicatedTagsArray.map((tag, key)=>
              <div key={key} id="individualTag">
                <button onClick={() => this.props.getFilteredTags(tag)}>{tag}</button> 
              </div>
            )}
            <br/>
        </div>

        <div id="filteredTags">
          <h2>Filtered tags</h2>
            {this.props.filteredTags.map((filteredTag, key)=>
              <button key={key} onClick={() => this.props.removeFilteredTags(key)}>{filteredTag} ❌</button>
            )}
        </div>
      </div>
    </>
  }
}


