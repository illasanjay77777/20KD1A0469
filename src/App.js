import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import { useEffect } from "react";
import Train from "./Train/Train";

function App() {
  useEffect(() => {
    fetch("http://20.244.56.144/train/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: "Train Central",
        clientID: "98be804a-810e-4d52-89ff-c3599d181cfa",
        clientSecret: "kbOarolUybOSXknL",
        ownerName: "sanjay kiran",
        ownerEmail: "illasanjaykirankiran@gmail.com",
        rollNo: "20kd1a0469",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("train-token", data.access_token);
      });
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:trainNumber" element={<Train />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
