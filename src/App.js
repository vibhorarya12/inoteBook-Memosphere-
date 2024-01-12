import "./App.css";
import About from "./components/About";
import { Button, Result } from 'antd';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Newhome from "./components/Newhome";
import ResponsiveAppBar from "./components/Nav";
import { createContext, useState, useEffect } from "react";
import Usernotes from "./components/Usernotes";
export const Authcontext = createContext("");
function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
   
  useEffect(() => {
    const storedAuthToken = localStorage.getItem("authToken");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, [authToken]);

  return (
    <Authcontext.Provider value={{ authToken }}>
      <Router>
        <ResponsiveAppBar />

        <div style={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<Newhome />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/user"
              element={
                authToken ? (
                  <Usernotes />
                ) : (
                  <Result
                  status="403"
                  title="403"
                  subTitle="Sorry, you are not authorized to access this page."

                />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </Authcontext.Provider>
  );
}

export default App;
