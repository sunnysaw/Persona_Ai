// import { useAuth0 } from "@auth0/auth0-react";
// import React from "react";

// const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     isAuthenticated && (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
//           {/* Profile Image */}
//           <img
//             src={user.picture}
//             alt={user.name}
//             className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-500 shadow-md"
//           />

//           {/* Name */}
//           <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>

//           {/* Email */}
//           <p className="mt-2 text-gray-600">{user.email}</p>

//           {/* Divider */}
//           <div className="border-t my-4"></div>

//           {/* Extra Info (Optional) */}
//           <p className="text-sm text-gray-500">
//             Welcome back! You are logged in with Auth0 🚀
//           </p>
//         </div>
//       </div>
//     )
//   );
// };

// export default Profile;
