import axios from "axios";
const url = "http://localhost:8080/";

export async function createUser(userData) {
  return await axios.post(`${url}users`, userData); //return a response object
}
export async function checkUser(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;

  try {
    const response = await axios.get(`${url}users`, {
      params: { email },
    });
    const data = response.data;
    console.log({ data });

    if (data.length) {
      if (password === data[0].password) {
        return { data: data[0] };
      } else {
        throw new Error("wrong credentials");
      }
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    // Handle any errors here if needed
    console.error(error);
    throw error;
  }
}
