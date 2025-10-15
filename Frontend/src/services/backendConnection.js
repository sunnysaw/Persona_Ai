import axios from "axios";

export const userCredential = async (query, token) => {
  try {
    const response = await axios.post(`http://localhost:3000/login`, query, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(`Error occur in the userCredential file => ${error.message}`);
  }
};

export const deleteUserCredential = async (query) => {
  try {
    const response = await axios.post(`http://localhost:3000/logout`, query, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(`Error occur in the userCredential file => ${error.message}`);
  }
};

export const sendUserQuery = async (query) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/query`,
      {
        userQueryMessage: { query },
      },
       {withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(`Error in sendUserQuery => ${error.message}`);
  }
};
