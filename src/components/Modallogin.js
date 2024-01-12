import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import TextField from "@mui/material/TextField";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
var host = process.env.REACT_APP_URL;
const ModalLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [missing, setmissing] = useState(false);
  let navigate = useNavigate();
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
     setmissing(false);
    if (credentials.email === "" || credentials.password === "") {
      setmissing(true);
      return;
    }
    setLoading(true);
    const response = await fetch(
      `${host}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    setLoading(false);
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("authToken", json.authToken);

      // Display the message directly without using the 'msg' state
      messageApi.open({
        type: "success",
        content: "logged in successfully",
      });

      handleOk();
      navigate("/user");
      window.location.reload();
    } else {
      messageApi.open({
        type: "error",
        content: "invalid credentials ",
      });
    }
  };

  return (
    <>
      <Button
        type="primary"
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "20px",
        }}
        onClick={showModal}
      >
        Login
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
          }}
        >
          <img
            src={require("./login2.png")}
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
        </div>
        {missing && (
          <div>
            <p style={{ color: "red" }}>
              required** feilds cannot be left blank
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalLogin;
