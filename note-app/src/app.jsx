import React, { Component } from 'react';
import './style.css';

class app extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      newNoteTitle: "",
      newNoteTag: "",
      newNoteContent: "",

      notes: [
        {"title": "How to make a soup", "tag": "recipe", "content": "Put the powder into the pot and boil it."},
        {"title": "How to study", "tag": "lifehack", "content": "Just do it."},
        {"title": "How to make a katsu", "tag": "recipe", "content": "Fry chicken or pork."},
        {"title": "How to save money", "tag": "lifehack", "content": "Just save it."},
        {"title": "What is life?", "tag": "philosophy", "content": "Life is something that has no meaning itself. You make of your own."}
      ],
      filteringTag: undefined,
      filteredNotes: [],
      unduplicatedTagsArray: [],
      currentlyClickedFilter: false
      
    }
    this.handleNewNoteTitleChange = this.handleNewNoteTitleChange.bind(this);
    this.handleNewNoteTagChange = this.handleNewNoteTagChange.bind(this);
    this.handleNewNoteContentChange = this.handleNewNoteContentChange.bind(this);
    this.getNotesByTag = this.getNotesByTag.bind(this);
    this.submitNewNote = this.submitNewNote.bind(this);
  }
  
  componentDidMount(){
    console.log("componentDidMount")
    const tempTagArray = this.state.notes.map((note)=>note.tag)

    this.setState({
      unduplicatedTagsArray: [...new Set(tempTagArray)],
      filteredNote: this.state.notes
    })
    this.getNotesByTag();
  }

  componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate")
    // console.log("prevProps.notes: " + JSON.stringify(prevState.notes))
    // console.log("this.props.notes: " + JSON.stringify(this.state.notes))
    if(prevState.notes !== this.state.notes){
      const tempTagArray = this.state.notes.map((note)=>note.tag)
      console.log("tempTagArray: " + tempTagArray)
      this.setState({
        unduplicatedTagsArray: [...new Set(tempTagArray)]
      })

      this.getNotesByTag(this.state.filteringTag);
      
    }
    console.log("componentDidUpdate finished")
  }

  getNotesByTag(tag){
    const tempNotesArray = [];
    if(tag===undefined){
      this.setState({
        filteredNotes: this.state.notes
      })
    }
    else{
      this.setState({
        filteringTag: tag
      })

      for(let i=0; i<this.state.notes.length; i++){
        if(this.state.notes[i].tag === tag){
          tempNotesArray.push(this.state.notes[i]);
        }
      }

      // for(let i=0; i<tempNotesArray.length; i++){
      //   console.log(tempNotesArray[i])
      // }

      this.setState({
        filteredNotes: tempNotesArray
      })
      // console.log("set filteringTag: " + this.state.filteringTag)
    }
  }

  handleNewNoteTitleChange(event){
    this.setState({
      newNoteTitle: event.target.value
    });
  }

  handleNewNoteTagChange(event){
    this.setState({
      newNoteTag: event.target.value
    });
  }

  handleNewNoteContentChange(event){
    this.setState({
      newNoteContent: event.target.value
    });
  }

  submitNewNote(event){
    event.preventDefault();
    console.log(this.state.newNoteTitle);
    console.log(this.state.newNoteTag);
    console.log(this.state.newNoteContent);
    if(this.state.newNoteTitle==="" || !this.state.newNoteTag==="" || !this.state.newNoteContent===""){
      alert("Please fill out the form for all the sections.")
    }
    else{
      this.setState({
        notes: [...this.state.notes, { "title": this.state.newNoteTitle, "tag": this.state.newNoteTag, "content": this.state.newNoteContent}],
        newNoteTitle: "",
        newNoteTag: "",
        newNoteContent: ""
      });
      event.target.reset();
    }

    // this.getNotesByTag(this.state.newNoteTag);
  }

  render() {
    return (
      <>
      {/* 1. Adding new note form */}
        <form name="newNoteForm" onSubmit={this.submitNewNote}>
          <fieldset>
          <legend>New Note</legend>
            <label>
            Title:
              <input type="text" name="title" onChange={this.handleNewNoteTitleChange}/>
            </label><br/>

            <label>
            Tag:
              <input type="text" name="tag" onChange={this.handleNewNoteTagChange}/>
            </label><br/>

            <label>
            Content:
              <textarea type="text" name="content" onChange={this.handleNewNoteContentChange}/>
            </label><br/>

            <button >Submit</button>
            </fieldset>
        </form>
      <br/>

      {/* 2. Buttons - filters */}
        <button onClick={() => this.getNotesByTag()}>All</button> 
        
        {this.state.unduplicatedTagsArray.map((tag)=>
          <div id="tags">
            <button onClick={() => this.getNotesByTag(tag)}>{tag}</button> 
          </div>
        )}
        <br/>

        

        {/* 3. Note section */}
        <h1>Filtered Notes</h1>
        {this.state.filteredNotes.map((filteredNote)=>
          <div className="note-individual">
            
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
