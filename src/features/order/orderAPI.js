import axios from "axios";
const url = "http://localhost:8080/";

export async function createOrder(order) {
  return await axios.post(`${url}orders`, order); // Returns a response object
}
export async function updateOrder(order) {
  return await axios.patch(`${url}orders/${order.id}`, order); // Returns a response object
}
// its for admin orders page
export async function fetchAllOrders(sort, pagination) {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  const response = await axios.get(`${url}orders?${queryString}`);
  const totalOrders = await response.headers.get("X-Total-Count");

  // Return an object containing products and totalItems count.
  return { data: { orders: response.data, totalOrders: +totalOrders } };
}

