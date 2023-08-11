import axios from "axios";
const url = "http://localhost:8080/";

export async function fetchLoggedInUserOrders(userId) {
  // inside orders api -> you get objects ->get those objects whose user.id=${userId}
  return await axios.get(`${url}orders/?user.id=${userId}`);
}
export async function fetchLoggedInUser(userId) {
  // inside orders api -> you get objects ->get those objects whose user.id=${userId}
  return await axios.get(`${url}users/${userId}`);
}
export async function updateUser(update) {
  return await axios.patch(`${url}users/${update.id}`,update);
}
