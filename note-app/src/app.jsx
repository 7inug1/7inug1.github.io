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
    this.addTags = this.addTags.bind(this);
    this.removeTags = this.removeTags.bind(this);
    
    
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

  getNotesByTag(tag){
    console.log("getNotesByTag")

    if(tag===undefined){
      this.setState({
        filteredNotes: this.state.notes
      })
    }
    else{
      const tempNotesArray = [];

      this.setState({
        filteringTag: tag
      })

      for(let i=0; i<this.state.notes.length; i++){
        if(this.state.notes[i].tag === tag){
          tempNotesArray.push(this.state.notes[i]);
        }
      }

      this.setState({
        filteredNotes: tempNotesArray
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate")

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
    console.log("addTags -> newNoteTags: " + this.state.newNoteTags)
    // if(event.key==="Shift"){
    //   console.log("Shift")
    // }
    if(event.key==="Shift"&&event.target.value){
      const tempArray = this.state.newNoteTags
      tempArray.push(event.target.value)
      console.log("tempArray: " + tempArray)
      for(let i = 0; i< tempArray.length; i++){
        console.log("tempArray[i]: " + tempArray[i])
      }
      this.setState({
        newNoteTags: tempArray
      });  
      event.target.value = "";
    } 
  }

  removeTags(key){
    console.log("removeTags")
    let tempTagArray = this.state.newNoteTags.splice(key, 1)
    // console.log("removeTags -> tempTagArray: " + tempTagArray)
    this.setState({
      newNoteTags: tempTagArray
    })
  }

  handleNewNoteContentChange(event){
    this.setState({
      newNoteContent: event.target.value
    });
  }

  submitNewNote(event){
    event.preventDefault();
    // console.log(this.state.newNoteTitle);
    console.log(this.state.newNoteTags);
    // console.log(this.state.newNoteContent);
    // if(this.state.newNoteTitle==="" || !this.state.newNoteTags==="" || !this.state.newNoteContent===""){
    //   alert("Please fill out the form for all the sections.")
    // }
    // else{
      this.setState({
        notes: [...this.state.notes, { "title": this.state.newNoteTitle, "tag": this.state.newNoteTags, "content": this.state.newNoteContent}],
        newNoteTitle: "",
        newNoteTags: "",
        newNoteContent: ""
      });
      event.target.reset();
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
                  <button onClick={()=>this.removeTags(key)}>X</button>
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
