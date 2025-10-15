import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  userCredential,
  deleteUserCredential,
} from "../services/backendConnection.js";

function LeftSideNavbar() {
  const { isAuthenticated, loginWithRedirect, getIdTokenClaims, logout, user } =
    useAuth0();

  const handleLogout = async () => {
    try {
      if (user?.email) {
        const deletUser = await deleteUserCredential({ email: user.email });
        if (deletUser?.success) {
          logout({ logoutParams: { returnTo: window.location.origin } });
        }
      }
    } catch (error) {
      console.log(`error occur form backend => ${error}`);
    }
  };

  useEffect(() => {
    const handleOAuthLogin = async () => {
      if (isAuthenticated && user) {
        try {
          const oAuthUserCredential = JSON.stringify(user, null, 2);
          const idTokenClaims = await getIdTokenClaims(); 
          const token = idTokenClaims.__raw; 

          const backendResponse = await userCredential(
            oAuthUserCredential,
            token
          );

          if (backendResponse?.success) {
            console.log("User logged in successfully");
          } else {
            logout({ logoutParams: { returnTo: window.location.origin } });
          }
        } catch (error) {
          console.error("OAuth backend error:", error);
          logout({ logoutParams: { returnTo: window.location.origin } });
        }
      }
    };

    handleOAuthLogin();
  }, [isAuthenticated, user]);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-800 text-white sticky top-0">
      {/* Upper Section - 20% */}
      <div className="h-1/5 flex flex-col justify-center items-center p-4 border-b border-gray-600">
        <h1 className="text-lg md:text-xl font-bold text-center">
          Give AI your <span className="text-indigo-400">T</span>ouch
        </h1>
        <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md transition">
          Customize AI
        </button>
      </div>

      {/* Middle Spacer */}
      <div className="flex-1"></div>

      {/* Lower Section - 20% */}
      <div className="h-1/5 flex flex-col justify-center items-center p-4 border-t border-gray-700">
        <img
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover mb-2"
          src={user?.picture || "https://via.placeholder.com/150"}
          alt="user_pic"
        />
        <h1 className="text-sm md:text-lg font-medium mb-2">
          {user?.name || "Guest"}
        </h1>

        {/* ✅ Toggle button based on login state */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-2 py-1 text-sm font-medium border-2 h-10 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 text-sm font-medium border-2 h-12 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}

export default LeftSideNavbar;
