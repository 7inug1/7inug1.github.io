import React, { Component } from 'react';
import './style.css';

class app extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      newNoteTitle: "",
      newNoteTags: [],
      newNoteContent: "",

      notes: [
        {"title": "How to make a soup", "tag": ["recipe", "soup"], "content": "Put the powder into the pot and boil it."},
        {"title": "계란밥 만드는 법", "tag": ["recipe", "lifehack"], "content": "계란에 밥 비비기"},
        {"title": "How to study", "tag": ["lifehack"], "content": "Just do it."},
        {"title": "How to make a katsu", "tag": ["recipe"], "content": "Fry chicken or pork."},
        {"title": "How to save money", "tag": ["lifehack"], "content": "Just save it."},
        {"title": "What is life?", "tag": ["philosophy"], "content": "Life is something that has no meaning itself. You make of your own."}
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
    this.addTags = this.addTags.bind(this);
    this.removeTags = this.removeTags.bind(this);
  }
  
  componentDidMount(){
    // console.log("componentDidMount")
    const totalTagsArray = this.state.notes.map((note)=>note.tag)
    const totalTagsArrayFlat = totalTagsArray.flat()
    this.setState({
      unduplicatedTagsArray: [...new Set(totalTagsArrayFlat)],
    })
    this.getNotesByTag(); // getting entire notes by not passing any parameter
  }

  getNotesByTag(tag){
    // console.log("getNotesByTag")
    // 1. get entire notes
    if(tag===undefined){
      this.setState({
        filteredNotes: this.state.notes // showing entire notes at the beginning
      })
    }
    
    // 2. get specific notes by 'filteringTag'
    else{
      const tempFilteredNotesArray = [];

      this.setState({
        filteringTag: tag
      })

      for(let i=0; i<this.state.notes.length; i++){
        for(let j=0; j<this.state.notes[i].tag.length; j++){
          if(this.state.notes[i].tag[j] === tag){
            tempFilteredNotesArray.push(this.state.notes[i]);
          }
        }
      }

      this.setState({
        filteredNotes: tempFilteredNotesArray
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    // console.log("componentDidUpdate")
    // 1. re-spread 'unduplicatedTagsArray' buttons
    if(prevState.notes !== this.state.notes){
      const tempTagArray = this.state.notes.map((note)=>note.tag) // 1. get all notes' tag
      const tempTagArrayFlat = tempTagArray.flat() // 2. make #1 flat
      const tempTagArrayFlatUnduplicated = [...new Set(tempTagArrayFlat)] // 3. get #2 unduplicated

      this.setState({
        unduplicatedTagsArray: tempTagArrayFlatUnduplicated
      })
      
      // 2. re-spread the notes
      this.getNotesByTag(this.state.filteringTag);
    }
  }

  handleNewNoteTitleChange(event){
    this.setState({
      newNoteTitle: event.target.value
    });
  }

  handleNewNoteTagChange(event){
    this.setState({
      newNoteTags: event.target.value
    });
  }

  addTags(event){
    event.preventDefault();

    if(event.key==="Shift"&&event.target.value){
      console.log("added")
      const tempNewNoteTagsArray = this.state.newNoteTags
      tempNewNoteTagsArray.push(event.target.value)

      this.setState({
        newNoteTags: tempNewNoteTagsArray
      });  
      console.log("newNoteTags: " + "["+this.state.newNoteTags+"]")
      event.target.value = "";
    } 
  }

  removeTags(event, key){
    event.preventDefault();

    let tempNewNoteTagsArray = this.state.newNoteTags
    tempNewNoteTagsArray.splice(key, 1)

    this.setState({
      newNoteTags: tempNewNoteTagsArray
    })
    console.log("newNoteTags: " + "["+this.state.newNoteTags+"]")
  }

  handleNewNoteContentChange(event){
    this.setState({
      newNoteContent: event.target.value
    });
  }

  submitNewNote(event){
    event.preventDefault();
    // console.log(this.state.newNoteTitle);
    // console.log(this.state.newNoteTags);
    // console.log(this.state.newNoteContent);
    // if(this.state.newNoteTitle==="" || !this.state.newNoteTags==="" || !this.state.newNoteContent===""){
    //   alert("Please fill out the form for all the sections.")
    // }
    // else{

      this.setState({
        notes: [...this.state.notes, { "title": this.state.newNoteTitle, "tag": this.state.newNoteTags, "content": this.state.newNoteContent}],
        newNoteTitle: "",
        newNoteTags: [],
        newNoteContent: ""
      });
      event.target.reset();

      console.log(this.state.notes)
    // }
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
              <input type="text" name="tag" onKeyUp={this.addTags} placeholder="Press enter to add tags" size="80"/>
            </label><br/>
            <ul>
              {this.state.newNoteTags.map((newNoteTag, key)=>
                <li key={key}>
                  <h1>key: {key}</h1>
                  <span>{newNoteTag}</span>
                  <button onClick={(event)=>this.removeTags(event, key)}>X</button>
                </li>
              )}
            </ul>

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
        {this.state.filteredNotes.map((filteredNote, key)=>
          <div className="note-individual">
            <h3 key={filteredNote.title}> 
              Title: {filteredNote.title} 
            </h3>

            <h3 key={filteredNote.tag}> 
              Tag: 
              {filteredNote.tag.map((tag, key)=>
                <li key={key}>{key+1}. {tag}</li>
              )} 
            </h3>

            <h3 key={filteredNote.content}> 
              Content: {filteredNote.content} 
            </h3>
          </div>
        )}
      </>
    );
  }
}

export default app;
