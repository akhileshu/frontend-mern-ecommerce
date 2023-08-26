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

export async function loginUser(loginInfo) {
  try {
    const response = await axios.post(`${url}/auth/login`, loginInfo);
    if (response.status === 200) {
      // Successful login
      return response;
    } else {
      // email not found or password did not match
      console.log(response.data);
      throw new Error(response.data);
      // dont know why but if credentials didnt match else block is not executing and catch -> error is executing
    }
  } catch (error) {
    // console.log({ error });
    const errorMessage = error?.response?.data || "An error occurred during login.";
    throw new Error(errorMessage); // Store the error message string in the Redux state  }
}
}
export async function checkAuth() {
  try {
    const response = await axios.get(`${url}/auth/check`);
    if (response.status === 200) {
      // Successfully authenticated
      return response;
    } else {
      throw new Error(response.data);
    }
  } catch (error) {
    throw new Error(error)
    // TODO: on server it will only return some info of user (not password)
}
}

export async function signOut(userId) {
  return { data: "success" };
}
