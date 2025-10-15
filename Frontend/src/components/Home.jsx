import React from "react";
import ChatSection from "./ChatSection.jsx";
import LeftSideNavbar from "./LeftSideNavbar.jsx";
// import LoginButton from "./Login.jsx";
// import LogoutButton from "./Logout.jsx";
// import Profile from "./Profile.jsx";

function Home() {
  return (
    <div className="flex h-screen w-full bg-gray-50">

      <div className="hidden md:flex w-[14%] min-w-[200px] max-w-[280px]">
        <LeftSideNavbar />
      </div>

      <div className="flex-1 flex">
        <ChatSection />
      </div>
      {/* <LoginButton />
      <LogoutButton />
      <Profile/> */}
    </div>
  );
}

export default Home;
