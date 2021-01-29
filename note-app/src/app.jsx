import React, { Component } from 'react';
import './style.css';
import Form from "./Form.jsx";
import Note from "./Note.jsx";
import Tag from "./Tag.jsx";
//multi-tag 시도했던 건데 boolean array 만들어도 뭐 하는지 잘 모르겠어서 다시 만들기로 함.
export default class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      newNoteTitle: "",
      newNoteTags: [],
      newNoteContent: "",

      // Note.jsx
      notes: [
        {"title": "How to make a soup", "tag": ["recipe"], "content": "Put the powder into the pot and boil it."},
        {"title": "make a table", "tag": ["recipe"], "content": "Put table boil it."},
        {"title": "계란밥 만드는 법", "tag": ["recipe", "soup"], "content": "계란에 밥 비비기"},
        {"title": "비빔밥 만드는 법", "tag": ["soup", "recipe"], "content": "밥 비비기"},
        {"title": "How to study", "tag": ["recipe", "soup", "lifehack"], "content": "Just do it."},
        {"title": "How to make a katsu", "tag": ["lifehack", "recipe", "soup"], "content": "Fry chicken or pork."},
        // {"title": "How to save money", "tag": ["lifehack"], "content": "Just save it."},
        // {"title": "What is life?", "tag": ["philosophy"], "content": "Life is something that has no meaning itself. You make of your own."}
      ],

      filteringTag: [], //하나
      filteredTags: [], //깔게 되는 것
      filteredNotes: [],
      
      unduplicatedTagsArray: [],
      currentlyClickedFilter: false
      
    }
    this.handleNewNoteTitleChange = this.handleNewNoteTitleChange.bind(this); //FORM.JSX
    this.handleNewNoteContentChange = this.handleNewNoteContentChange.bind(this); //FORM.JSX
    this.getFilteredTags = this.getFilteredTags.bind(this);
    this.getNotesByTags = this.getNotesByTags.bind(this);
    this.submitNewNote = this.submitNewNote.bind(this); //FORM.JSX
    this.addTags = this.addTags.bind(this); //FORM.JSX
    this.removeFilteredTags = this.removeFilteredTags.bind(this);
  }
  
  componentDidMount(){
    // console.log("componentDidMount")
    const totalTagsArray = this.state.notes.map((note)=>note.tag)
    const totalTagsArrayFlat = totalTagsArray.flat()
    const tempFilteringTag = [undefined];
    this.setState({
      filteringTag: tempFilteringTag,
      unduplicatedTagsArray: [...new Set(totalTagsArrayFlat)],
    })
    this.getNotesByTags(); // getting entire notes by not passing any parameter
  }

  // getNotesByTags(tag)에서 불리는 것
  getFilteredTags(tag){
    const tempFilteredTags = [];
    console.log("tag: " + tag)
    tempFilteredTags.push(tag)
    console.log("tempFilteredTags: " + tempFilteredTags)
    let finalTags = [...this.state.filteredTags, tempFilteredTags]
    let finalTags2 = finalTags.flat();
    let finalTags3 = [...new Set(finalTags2)]
    
    this.setState({filteredTags: finalTags3})
    this.getNotesByTags(tag)
  }

  getNotesByTags(tag){
    // 1. get entire notes
    if(tag===undefined){
      this.setState({
        filteredNotes: this.state.notes // showing entire notes at the beginning
      })
    }
    
    else{
      const tempFilteredNotesArray = [];
      let checker = (arr, target) => target.every(item => arr.includes(item));
      for(let i = 0; i < this.state.notes.length; i++){
        if (checker(this.state.notes[i].tag, this.state.filteredTags) === true ){
          tempFilteredNotesArray.push(this.state.notes[i])
        }
      }      
      this.setState({
        // filteringTag: [...this.state.filteringTag, tag],
        filteredNotes: tempFilteredNotesArray
      })
      
    }
  }

  componentDidUpdate(prevProps, prevState){
    // console.log("componentDidUpdate")
    // 1. re-spread 'unduplicatedTagsArray' buttons
    if(prevState.notes !== this.state.notes || prevState.filteredTags !== this.state.filteredTags){
      const tempTagArray = this.state.notes.map((note)=>note.tag) // 1. get all notes' tag
      const tempTagArrayFlat = tempTagArray.flat() // 2. make #1 flat
      const tempTagArrayFlatUnduplicated = [...new Set(tempTagArrayFlat)] // 3. get #2 unduplicated

      this.setState({
        unduplicatedTagsArray: tempTagArrayFlatUnduplicated
      })
      
      // 2. re-spread the notes
      this.getNotesByTags(!undefined);
    }
  }

  //FORM.JSX
  handleNewNoteTitleChange(event){
    this.setState({
      newNoteTitle: event.target.value
    });
  }

  //FORM.JSX
  handleNewNoteContentChange(event){
    this.setState({
      newNoteContent: event.target.value
    });
  }

  //FORM.JSX
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

  removeFilteredTags(key){
    let tempFilteredTagsArray = this.state.filteredTags
    tempFilteredTagsArray.splice(key, 1)

    


    const tempFilteredNotesArray = [];
    let checker = (arr, target) => target.every(item => arr.includes(item));
    for(let i = 0; i < this.state.notes.length; i++){

      if (checker(this.state.notes[i].tag, tempFilteredTagsArray) === true ){
        tempFilteredNotesArray.push(this.state.notes[i])
      }
    }

    this.setState({
      filteredTags: tempFilteredTagsArray,
      filteredNotes: tempFilteredNotesArray
    })
  }

  // FORM.JSX
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
        {/* 1. Form */}
        <Form 
          newNoteTags={this.state.newNoteTags}
          newNoteContent={this.state.newNoteContent}
          submitNewNote={this.submitNewNote} 
          handleNewNoteTitleChange={this.handleNewNoteTitleChange}
          addTags={this.addTags}
          handleNewNoteContentChange={this.handleNewNoteContentChange}
        />

        {/* 2. Tag */}
        <Tag
          filteredTags={this.state.filteredTags}
          unduplicatedTagsArray={this.state.unduplicatedTagsArray}
          getNotesByTags={this.getNotesByTags}
          removeFilteredTags={this.removeFilteredTags}
          getFilteredTags={this.getFilteredTags}
        />

        {/* 3. Note section */}
        <Note 
          filteredNotes={this.state.filteredNotes}
        />
      </>
    );
  }
}

