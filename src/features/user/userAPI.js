import axios from "axios";
const url = "http://localhost:8080/";


// Define the function to fetch logged-in user's orders
export async function fetchLoggedInUserOrders(userId) {
  try {
    const response = await axios.get(`${url}orders/user/${userId}`);
    return response; // Return the data from the response
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error; // Rethrow the error for handling at a higher level
  }
}

export async function fetchLoggedInUser(userId) {
  // inside orders api -> you get objects ->get those objects whose user.id=${userId}
  return await axios.get(`${url}users/${userId}`);
}
export async function updateUser(update) {
  return await axios.patch(`${url}users/${update.id}`,update);
}
