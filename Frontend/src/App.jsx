import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
// import LoginButton from "./components/Login.jsx";
// import Profile from "./components/Profile.jsx";
// import LogoutButton from "./components/Logout.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<LoginButton />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<LogoutButton />} /> */}
      </Routes>
    </div>
  );
}

export default App;
