import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import {  notification } from 'antd';

export default function AddNote(props) {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const host = "https://cloudnotebook-deql.onrender.com";
  const [loading, setloading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const addNote = async (title, description, tag) => {
    try {
      setloading(true);
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.ok) {
        const addedNote = await response.json();
        // Do something with the added note if needed
        console.log("Note added:", addedNote);
        props.handleAdd();
        setloading(false);
        api.open({
          message: 'success',
          description:
            'Note added successfully',
          icon: (
            <SmileOutlined
              style={{
                color: '#108ee9',
              }}
            />
          ),
        });
      } else {
        // Handle the case where the request was not successful
        
        setloading(false);
      }
    } catch (error) {
      console.error("Error adding note:", error);
      setloading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3" >
      {contextHolder}
      <h1>Add note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            minLength={5}
            required
            value={note.title}
            style={{
              width: "200px",
              height: "50px",
              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            required
            value={note.description}
            style={{
              height: "200px",
              width: "50%",
              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
              overflowWrap: "break-word",
              resize: "vertical",
              overflowY: "auto",
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            minLength={5}
            required
            value={note.tag}
            style={{
              width: "80px",
              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          style={{ boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)" }}
          onClick={handleClick}
        >
          Add Note <i className="fa-solid fa-plus fa-beat"></i>
        </button>
      {loading?<Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
                color:'blue',
                marginLeft:'12px'
              }}
              spin
            />
          }
        />:null}
      </form>
    </div>
  );
}
