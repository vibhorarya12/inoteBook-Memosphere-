import React from "react";
import { Popconfirm , Badge, Tag } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {motion} from 'framer-motion';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import FormOutlined from '@ant-design/icons/FormOutlined'
function convertToCustomFormat(dateString) {
  // Parse the input date string
  const dateObject = new Date(dateString);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Format the date
  const formattedDate = dateObject.toLocaleString("en-US", options);

  return formattedDate;
}
export default function NoteItem(props) {
  return (
    
    <motion.div className="col-md-3" style={{ borderRadius: "50px" }}
     animate ={{ scale:1}}
     initial = {{scale:0}}
     transition={{  duration: 1 }}
    >
      <Badge.Ribbon text={convertToCustomFormat(props.date)} color="red">
      <div
        className="card my-3"
        style={{
          backgroundColor: "#FFDA22",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
          borderRadius: "25px",
        }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{props.title}</h5>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this note?"
              onConfirm={() => props.handleDeleteClick()}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <DeleteOutlined style={{fontSize:'20px', marginLeft:'5px'}} />
            </Popconfirm>
           
            <FormOutlined  onClick={props.updateNote} style={{fontSize:'20px', marginLeft:'5px'}}/>
          </div>
          <p className="card-text">{props.description}</p>
          <div>   {props.tags?<Tag color="#f50" style={{borderRadius:'20px'}}>{props.tags}</Tag>:null} </div>
        </div>
      </div>
      </Badge.Ribbon>
    </motion.div>
  );
}
