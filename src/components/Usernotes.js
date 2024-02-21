import React, { useState, useEffect, useRef } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import LinearProgress from "@mui/material/LinearProgress";

const host = process.env.REACT_APP_URL;


export default function Usernotes() {
  const [add, setadd] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  
  const handleAdd = () => {
    setadd(!add);
    console.log("called add");
  };
  const [notes, setNotes] = useState([]);
  const [fetchingNotes, setFetchingNotes] = useState(true);
  const [note, setNote] = useState({
    _id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });
      const json = await response.json();
      const sortedNotes = json.sort(
        (a, b) => new Date(b.Date) - new Date(a.Date)
      );
      console.log(sortedNotes);
      setNotes(sortedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setFetchingNotes(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getNotes();
    } else {
      // Handle authentication error or redirect to login
    }
  }, [add]);

  const onChange = (e) => {
    setNote((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      if (response.ok) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
        api.open({
          message: "Deleted!",
          description: "",
          icon: (
            <SmileOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleDeleteClick = (id) => {
    deleteNote(id);
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.ok) {
        const newNotes = notes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(newNotes);
        api.open({
          message: "Updated",
          description: "Note has been updated successfully",
          icon: (
            <SmileOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleClick = () => {
    if (note.etitle.length >= 5 && note.edescription.length >= 5) {
      editNote(note._id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
    } else {
      window.alert(
        "Please provide a title and description with at least 5 characters."
      );
    }
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      _id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  return (
    <div className="container-fluid" style={{ marginTop: "50px" }}>
      {contextHolder}
      {/* <button onClick={()=>(setaddview(!addview),console.log(addview))}>add note</button> */}

      <AddNote handleAdd={() => handleAdd()} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ background: "linear-gradient(90deg, #C7C5F4, #776BCC)" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                    style={{
                      height: "80px",
                      overflowWrap: "break-word",
                      resize: "vertical",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row my-3"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        {fetchingNotes ? (
          <LinearProgress />
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note._id}
              title={note.title}
              description={note.description}
              handleDeleteClick={() => handleDeleteClick(note._id)}
              updateNote={() => updateNote(note)}
              tags={note.tag}
              date={note.Date}
            />
          ))
        )}
      </div>
    </div>
  );
}
