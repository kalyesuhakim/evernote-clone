import React, { Component } from 'react'
import firebase from 'firebase/app'
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'
import './App.css'
export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       selectedNoteIndex: null,
       selectedNote: null,
       notes: null
    }
  }
  
  render() {
    return (
      <div className="app-container">
         <SidebarComponent 
          selectedNoteIndex={this.setState.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
          ></SidebarComponent>
         {
           this.state.selectedNote ? (
            <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
           ></EditorComponent>
           ): null
         }
      </div>
    )
  }
  componentDidMount = () => {
    firebase.firestore().collection('notes').onSnapshot(severUpdate => {
      const notes = severUpdate.docs.map(doc =>{
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      })
      console.log(notes);
      this.setState({ notes: notes });
    });
  }

  selectNote = (note,index) => this.setState({ selectedNote: note, selectedNoteIndex: index, });
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({notes: this.state.notes.filter(_note => _note !== note)})
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }else{
      this.state.notes.length > 1 ? this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1],this.state.selectedNoteIndex - 1) : this.setState({ selectedNoteIndex: null, selectedNote: null})
    }
    firebase.firestore().collection('notes').doc(note.id).delete();
  }
  noteUpdate = (id, noteObj) => {
    firebase.firestore().collection('notes').doc(id).update({ 
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
     })
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDb = await firebase.firestore().collection('notes').add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    const newID = newFromDb.id;
    await this.setState({ notes: [...this.state.notes, note]});
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
  }

}
