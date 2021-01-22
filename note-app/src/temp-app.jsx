import React, { Component } from 'react';
import './style.css';

class app extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      newNoteTitle: "",
      newNoteTagOne: "",
      newNoteTagTwo: "",
      newNoteTagThree: "",
      newNoteTag: [],
      newNoteContent: "",

      notes: [
        {"title": "How to make a soup", "tag": "recipe", "content": "Put the powder into the pot and boil it."},
        {"title": "How to study", "tag": "lifehack", "content": "Just do it."},
        // {"title": "How to make a katsu", "tag": "recipe", "content": "Fry chicken or pork."},
        // {"title": "How to save money", "tag": "lifehack", "content": "Just save it."},
        // {"title": "What is life?", "tag": "philosophy", "content": "Life is something that has no meaning itself. You make of your own."}
      ],
      filteringTag: [],
      filteredNotes: [],
      unduplicatedTagsArray: [],
      currentlyClickedFilter: false
      
    }
    this.handleNewNoteTitleChange = this.handleNewNoteTitleChange.bind(this);
    this.handleNewNoteTagChangeOne = this.handleNewNoteTagChangeOne.bind(this);
    this.handleNewNoteTagChangeTwo = this.handleNewNoteTagChangeTwo.bind(this);
    this.handleNewNoteTagChangeThree = this.handleNewNoteTagChangeThree.bind(this);
    this.handleNewNoteContentChange = this.handleNewNoteContentChange.bind(this);
    this.getNotesByTag = this.getNotesByTag.bind(this);
    this.submitNewNote = this.submitNewNote.bind(this);
  }
  
  componentDidMount(){
    console.log("componentDidMount")

    const tempTagArray = this.state.notes.map((note)=>note.tag)
    console.log("componentDidMount - tempTagArray: " + tempTagArray)
    this.setState({
      unduplicatedTagsArray: [...new Set(tempTagArray)],
      filteredNotes: this.state.notes,
      filteringTag: undefined
    })
    this.getNotesByTag();
  }

  getNotesByTag(tag){
    console.log("getNotesByTag")
    // 1. get entire notes
    const tempNotesArray = [];
    if(tag===undefined){
      this.setState({
        filteredNotes: this.state.notes
      })
    }
    // 2. get filtered notes
    else{
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
      const tempTagArray = (this.state.notes.map((note)=>note.tag)).flat();
      console.log("componentDidUpdate - tempTagArray: " + tempTagArray)
      const uniqueArray = [...tempTagArray]
      console.log("componentDidUpdate - uniqueArray: " + uniqueArray)
      // array에서 중복 item 빼기
      for(let i = 0; i<tempTagArray.length; i++){
        console.log(i + ": " + tempTagArray[i])
      }
      
      this.setState({
        unduplicatedTagsArray: uniqueArray
      })
      console.log("unduplicatedTagsArray: " + this.state.unduplicatedTagsArray)

      console.log("this.state.filteringTag: " + this.state.filteringTag)
      this.getNotesByTag(this.state.filteringTag);
      
    }
    console.log("componentDidUpdate finished")
  }

  

  handleNewNoteTitleChange(event){
    this.setState({
      newNoteTitle: event.target.value
    });
  }

  handleNewNoteTagChangeOne(event){
    this.setState({
      newNoteTagOne: event.target.value
    });
  }
  handleNewNoteTagChangeTwo(event){
    this.setState({
      newNoteTagTwo: event.target.value
    });
  }
  handleNewNoteTagChangeThree(event){
    this.setState({
      newNoteTagThree: event.target.value
    });
  }

  handleNewNoteContentChange(event){
    this.setState({
      newNoteContent: event.target.value
    });
  }

  submitNewNote(event){
    event.preventDefault();



    if(this.state.newNoteTitle==="" || !this.state.newNoteTagOne==="" || !this.state.newNoteTagTwo==="" || !this.state.newNoteTagThree==="" || !this.state.newNoteContent===""){
      alert("Please fill out the form for all the sections.")
    }
    else{
      this.setState({
        newNoteTag: this.state.newNoteTag.push(this.state.newNoteTagOne, this.state.newNoteTagTwo, this.state.newNoteTagThree),
        notes: [...this.state.notes, { "title": this.state.newNoteTitle, "tag": this.state.newNoteTag, "content": this.state.newNoteContent}],
        newNoteTitle: "",
        // newNoteTag: [...this.state.newNoteTag, this.state.newNoteTagOne, this.state.newNoteTagTwo, this.state.newNoteTagThree],
        
        // newNoteTag: [...this.state.newNoteTag, this.state.newNoteTagTwo],
        // newNoteTag: [...this.state.newNoteTag, this.state.newNoteTagThree],
        newNoteContent: ""
      });
      console.log("newNoteTitle: " + this.state.newNoteTitle);
      console.log("newNoteTagOne: " + this.state.newNoteTagOne);
      console.log("newNoteTagTwo: " + this.state.newNoteTagTwo);
      console.log("newNoteTagThree: " + this.state.newNoteTagThree);
      console.log("submitNewNote - newNoteTag: " + this.state.newNoteTag)
      console.log("submitNewNote - newNoteTag len: " + this.state.newNoteTag.length)
      console.log("newNoteContent: " + this.state.newNoteContent);
      event.target.reset();
    }
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
              <input type="text" name="tag" onChange={this.handleNewNoteTagChangeOne}/>
            </label><br/>
            <label>
            Tag:
              <input type="text" name="tag" onChange={this.handleNewNoteTagChangeTwo}/>
            </label><br/>
            <label>
            Tag:
              <input type="text" name="tag" onChange={this.handleNewNoteTagChangeThree}/>
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
