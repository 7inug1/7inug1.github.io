import React, { Component } from 'react';
import './style.css';

class app extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      title: "",
      tag: "",
      content: "",

      notes: [
        {"title": "How to make a soup", "tag": "recipe", "content": "Put the powder into the pot and boil it."},
        {"title": "How to study", "tag": "lifehack", "content": "Just do it."},
        {"title": "How to make a katsu", "tag": "recipe", "content": "Fry chicken or pork."},
        {"title": "How to save money", "tag": "lifehack", "content": "Just save it."},
        {"title": "What is life?", "tag": "philosophy", "content": "Life is something that has no meaning itself. You make of your own."}
      ],
      filteringTag: "",
      filteredNotes: [],
      unduplicatedTagsArray: []
      
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.getNotesByTag = this.getNotesByTag.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.submitNewNote = this.submitNewNote.bind(this);
  }
  
  componentDidMount(){
    console.log("componentDidMount")
    const tempTagArray = this.state.notes.map((note)=>note.tag)
    // console.log(tempTagArray);

    this.setState({
      unduplicatedTagsArray: [...new Set(tempTagArray)]
    })


  }

  componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate")
    if(prevProps.notes !== this.props.notes){
      this.getNotesByTag(this.state.tag);
    }
    // this.getNotesByTag();
  }

  getNotesByTag(tag){
    const tempNotesArray = [];
    this.setState({
      filteringTag: tag
    })
    
    // console.log("tempNotesArray: " + tempNotesArray);
    // console.log(tag + " is clicked.");

    for(let i=0; i<this.state.notes.length; i++){
      if(this.state.notes[i].tag === tag){
        tempNotesArray.push(this.state.notes[i]);
      }
    }

    for(let i=0; i<tempNotesArray.length; i++){
      console.log(tempNotesArray[i])
    }

    this.setState({
      filteredNotes: tempNotesArray
    })
    console.log("set filteringTag: " + this.state.filteringTag)
  }

  getNotes(){
    {this.state.notes.map((note)=>
      <div className="memo-individual">
        <h3 key={note.title}> Title: {note.title} </h3>
        <h3 key={note.tag}> Tag: {note.tag} </h3>
        <h3 key={note.content}> Content: {note.content} </h3>
      </div>
    )}
  }

  handleTitleChange(event){
    this.setState({
      title: event.target.value
    });
    // console.log(this.state.title);
  }

  handleTagChange(event){
    this.setState({
      tag: event.target.value
    });
    // console.log(this.state.tag);
  }

  handleContentChange(event){
    this.setState({
      content: event.target.value
    });
    // console.log(this.state.content);
  }

  submitNewNote(event){
    event.preventDefault();
    console.log(this.state.title);
    console.log(this.state.tag);
    console.log(this.state.content);

    this.setState({
      notes: [...this.state.notes, { "title": this.state.title, "tag": this.state.tag, "content": this.state.content}]
    });

    this.getNotesByTag(this.state.tag);
  }

  render() {
    // listTags(){
    //   <h1>hi</h1>
    //   {this.state.notes.map(
    //     (note)=>
    //       <div id="tags">
            
    //         <button key={note.tag}> {note.tag}</button> 
            
    //       </div>
    //   )}
    // }
    return (
      <>

        <form name="newMemoForm" onSubmit={this.submitNewNote}>
          <fieldset>
          <legend>New Memo</legend>
            <label>
            Title:
              <input type="text" name="title" onChange={this.handleTitleChange}/>
            </label><br/>

            <label>
            Tag:
              <input type="text" name="tag" onChange={this.handleTagChange}/>
            </label><br/>

            <label>
            Content:
              <textarea type="text" name="content" onChange={this.handleContentChange}/>
            </label><br/>

            <button >Submit</button>
            </fieldset>
        </form>
      <br/>
      {/* <button onClick={this.getUnduplicatedTags}> button</button>  */}
        {this.state.unduplicatedTagsArray.map((tag)=>
          <div id="tags">
            <button onClick={() => this.getNotesByTag(tag)}> {tag}</button> 
          </div>
        )}
        {/* {this.getUnduplicatedTags()} */}
        <br/>
        {/* <button onClick={this.getNotes}> button</button> */}
        
        <h1>Entire Notes</h1>
        {this.state.notes.map((note)=>
          <div className="memo-individual">
            
            <h3 key={note.title}> Title: {note.title} </h3>
            <h3 key={note.tag}> Tag: {note.tag} </h3>
            <h3 key={note.content}> Content: {note.content} </h3>
          </div>
        )}

        <h1>Filtered Notes</h1>
        {this.state.filteredNotes.map((filteredNote)=>
          <div className="memo-individual">
            
            <h3 key={filteredNote.title}> Title: {filteredNote.title} </h3>
            <h3 key={filteredNote.tag}> Tag: {filteredNote.tag} </h3>
            <h3 key={filteredNote.content}> Content: {filteredNote.content} </h3>
          </div>
        )}
      </>
    );
  }
}

export default app;
