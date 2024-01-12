import React, { useRef } from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import ModalLogin from "./Modallogin";
import ModalSignup from "./ModalSignup";
import { Authcontext } from "../App";
import Footer from "./Footer";
const bubbleStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "linear-gradient(400deg, #C7C5F4, #776BCC)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};
const boxstyle = {
  display: "flex",
  justifyContent: "flex-end",
};

export default function Newhome() {
  const { authToken } = React.useContext(Authcontext);
  const ImgStyle = {
    width: "100%",
    height: "550px",
    objectFit: "cover",
  };
  const shadowRef1 = useRef();
  const shadowRef2 = useRef();
  const shadowRef3 = useRef();

  const handleHover = (ref) => {
    ref.current.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.6)";
  };

  const handleLeave = (ref) => {
    ref.current.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  };
  return (
    <>
      <div
        style={{ position: "relative", width: "100%", alignItems: "center" }}
      >
        <Carousel
          autoplay
          style={{ position: "relative" }}
          autoplaySpeed={2500}
        >
          <div style={{ position: "relative" }}>
            <img
              src={require("./car1.jpg")}
              style={{ ...ImgStyle, objectFit: "cover" }}
              alt=""
            />
          </div>

          <div>
            <img src={require("./car2.jpg")} style={ImgStyle} alt="" />
          </div>
          <div>
            <img src={require("./car3.jpg")} style={ImgStyle} alt="" />
          </div>
          <div>
            <img src={require("./car4.jpg")} style={ImgStyle} alt="" />
          </div>
        </Carousel>

        <div
          style={{
            position: "absolute",
            zIndex: "1",
            top: "90%",
            right: "45%",
          }}
        >
          {authToken ? null : <ModalLogin />}
          <ModalSignup />
        </div>
      </div>
      <div
        className="container-fluid"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <div className="row">
          <div
            className="col-md-8"
            style={{
              ...boxstyle,
              justifyContent: "center",

              borderRadius: "20px",

              alignItems: "center",
            }}
          >
            <motion.h2
              style={{
                color: "white",

                textShadow: "2px 2px 2px black",
              }}
            >
              "Emphasizing the ease of note-taking while highlighting the robust
              user authentication for a secure experience."
            </motion.h2>
          </div>
          <div className="col-md-4" style={boxstyle}>
            <div
              style={bubbleStyle}
              ref={shadowRef1}
              onMouseEnter={() => handleHover(shadowRef1)}
              onMouseLeave={() => handleLeave(shadowRef1)}
            >
              <motion.img
                src={require("./notes.png")}
                alt="Notes"
                style={{ width: "80%", height: "80%", objectFit: "contain" }}
                animate={{ rotate: [0, 15, 15, 0] }}
                transition={{ repeat: "Infinity", duration: 5 }}
              />
            </div>
          </div>
        </div>

        
        <div className="row" style={{ marginTop: "10px" }}>
          <div
            className="col-md-4"
            style={{ ...boxstyle, justifyContent: "flex-start" }}
          >
            <div
              style={bubbleStyle}
              ref={shadowRef2}
              onMouseEnter={() => handleHover(shadowRef2)}
              onMouseLeave={() => handleLeave(shadowRef2)}
            >
              <motion.img
                src={require("./lock.png")}
                alt="Notes"
                style={{ width: "80%", height: "80%", objectFit: "contain" }}
                animate={{ rotate: [0, 15, 15, 0] }}
                transition={{ repeat: "Infinity", duration: 1 }}
              />
            </div>
          </div>
          <div
            className="col-md-8"
            style={{ ...boxstyle, justifyContent: "center" }}
          >
            <motion.h2
              style={{
                color: "white",

                textShadow: "2px 2px 2px black",
              }}
            >
              "Inviting users to explore a platform where creativity soars,
              backed by secure authentication and efficient admin management."
            </motion.h2>
          </div>
        </div>
        {/* new row */}
        <div className="row" style={{ marginTop: "10px" }}>
          <div
            className="col-md-8"
            style={{ ...boxstyle, justifyContent: "center" }}
          >
            <motion.h2
              style={{
                color: "white",

                textShadow: "2px 2px 2px black",
              }}
            >
              "Communicating the ease and power that comes with admin-led user
              management."
            </motion.h2>
          </div>
          <div className="col-md-4" style={boxstyle}>
            <div
              style={bubbleStyle}
              ref={shadowRef3}
              onMouseEnter={() => handleHover(shadowRef3)}
              onMouseLeave={() => handleLeave(shadowRef3)}
            >
              <motion.img
                src={require("./phone2.png")}
                alt="Notes"
                style={{ width: "75%", height: "75%", objectFit: "contain" }}
                animate={{ rotate: [0, 15, 15, 0] }}
                transition={{ repeat: "Infinity", duration: 5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="conatiner-fluid">
        <Footer />
      </div>
    </>
  );
}
