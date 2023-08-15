import axios from "axios";
const url = "http://localhost:8080";

/**
 * Creates a new user by making a POST request to the server.
 * @param {Object} userData - User data to be sent to the server for registration.
 * @returns {Promise} A promise that resolves to the response object from the server.
 */
export async function createUser(userData) {
  return await axios.post(`${url}/auth/signup`, userData); // Returns a response object
}

/**
 * Checks user credentials by making a GET request to the server.
 * @param {Object} loginInfo - Login information containing email and password.
 * @returns {Promise} A promise that resolves to the user data if the credentials are correct.
 * @throws {Error} Throws an error if the user is not found or the credentials are incorrect.
 */

export async function checkUser(loginInfo){
  try {
    const response = await axios.post(`${url}/auth/login`, loginInfo)
    if (response.status === 200) {
      // Successful login
      return response;
    } else {
      // email not found or password did not match
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred during login.');
  }
}
export async function signOut(userId) {
  return { data: "success" };
}
