import axios from "axios";
const url = "http://localhost:8080/";


export async function createOrder(order) {
  return await axios.post(`${url}orders`, order); // Returns a response object
}
