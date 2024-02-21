import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import TextField from "@mui/material/TextField";
import { Spin } from "antd";
const host = process.env.REACT_APP_URL;
const ModalSignup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [missing, setmissing] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setmissing(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setmissing(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;
    if (name === "" || email === "" || password === "" || cpassword === "") {
      setmissing(true);
      return;
    }
    setLoading(true);
    if (password !== cpassword) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Invalid Credentials!",
      });
      return;
    }

    const response = await fetch(
      `${host}/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    setLoading(false);
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setCredentials({ name: "", email: "", password: "", cpassword: "" });

      messageApi.open({
        type: "success",
        content: "User created successfully",
      });
      handleOk();
      setmissing(false);
    } else {
      messageApi.open({
        type: "error",
        content: "error creating user (something went wrong)",
      });
    }
    setmissing(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "20px",
          marginLeft: "10px",
        }}
        onClick={showModal}
      >
        Sign Up
      </Button>
      {contextHolder}
      <Modal
        title=""
        visible={isModalOpen}
        onOk={(e) => {
          handleSubmit(e);
        }}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={require("./signup.png")}
            alt="Notes"
            style={{ width: "60%", height: "60%", objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <TextField
            style={{ width: "70%" }}
            type="text"
            id="name"
            name="name"
            label="Name"
            variant="standard"
            onChange={onChange}
          />
          <TextField
            style={{ width: "70%" }}
            type="email"
            id="email"
            name="email"
            label="Email"
            variant="standard"
            onChange={onChange}
          />
          <TextField
            style={{ width: "70%" }}
            type="password"
            id="password"
            name="password"
            label="Password"
            variant="standard"
            onChange={onChange}
          />
          <TextField
            style={{ width: "70%" }}
            type="password"
            id="cpassword"
            name="cpassword"
            label="Confirm Password"
            variant="standard"
            onChange={onChange}
            required={true}
          />
          {loading && (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
                position: "relative",
              }}
            >
              <h5>sit back ! this might take a while</h5>

              <div style={{ left: "40%", position: "absolute" }}>
                {" "}
                <Spin />
              </div>
            </div>
          )}
          {missing && (
            <div>
              {" "}
              <p style={{ color: "red" }}>
                {" "}
                required** feilds cannot be left blank
              </p>{" "}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalSignup;
