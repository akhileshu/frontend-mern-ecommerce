import axios from "axios";
const url = "http://localhost:8080/";

/**
 * Creates a new user by making a POST request to the server.
 * @param {Object} userData - User data to be sent to the server for registration.
 * @returns {Promise} A promise that resolves to the response object from the server.
 */
export async function createUser(userData) {
  return await axios.post(`${url}users`, userData); // Returns a response object
}

/**
 * Checks user credentials by making a GET request to the server.
 * @param {Object} loginInfo - Login information containing email and password.
 * @returns {Promise} A promise that resolves to the user data if the credentials are correct.
 * @throws {Error} Throws an error if the user is not found or the credentials are incorrect.
 */
export async function checkUser(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;

  try {
    const response = await axios.get(`${url}users`, {
      params: { email },
    });
    const data = response.data;
    // console.log({ data });

    if (data.length) {
      if (password === data[0].password) {
        return { data: data[0] }; // Returns user data if credentials are correct
      } else {
        throw new Error("wrong credentials"); // Throws an error if the password is incorrect
      }
    } else {
      throw new Error("user not found"); // Throws an error if the user is not found
    }
  } catch (error) {
    // Handle any errors here if needed
    console.error(error);
    throw error; // Throws the error to be handled by the caller
  }
}
export async function signOut(userId) {
  return { data: "success" };
}
