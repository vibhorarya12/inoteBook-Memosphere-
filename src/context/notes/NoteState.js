import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://cloudnotebook-deql.onrender.com";
  const notesintial = [];
  const [notes, setNotes] = useState(notesintial);
  //get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },

      
    });
    const json = await response.json();
    const sortedNotes = json.sort((a, b) => new Date(b.date) - new Date(a.date));
    // console.log(json);
    setNotes(sortedNotes);
  };

  //create note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('authToken')
      },

      body: JSON.stringify({title,description, tag})
    });
    
    const note = await response.json();
    setNotes(notes.concat(note));
    
  };

  //delete note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('authToken')
      },

     
    });
    const json = await response.json();
    console.log(json);
    console.log("deleted id : " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //update note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('authToken')
      },

      body: JSON.stringify({title,description, tag}),
    });
    const json = await response.json();
    console.log(json)
   
    let newNotes = JSON.parse(JSON.stringify(notes))
    /////
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
