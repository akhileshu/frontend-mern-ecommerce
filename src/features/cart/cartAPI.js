import axios from "axios";
const url = "http://localhost:8080/";

/**
 * Adds an item to the cart by making a POST request to the server.
 * @param {Object} item - The item to be added to the cart.
 * @returns {Promise} A promise that resolves to the response object from the server.
 */
export async function addToCart(item) {
  return await axios.post(`${url}cart`, item); // Returns a response object
}

/**
 * Fetches cart items by user ID by making a GET request to the server.
 * @param {string} userId - The ID of the user whose cart items are to be fetched.
 * @returns {Promise} A promise that resolves to the response object from the server containing the cart items.
 */
export async function fetchItemsByUserId(userId) {
  return await axios.get(`${url}cart`, {
    params: { user: userId },
  });
}

/**
 * Updates an item in the cart by making a PATCH request to the server.
 * @param {Object} update - The update object containing the updated item data.
 * @returns {Promise} A promise that resolves to the response object from the server.
 */
export async function updateCart(update) {
  return await axios.patch(`${url}cart/${update.id}`, update); // Returns a response object
}

/**
 * Deletes an item from the cart by making a DELETE request to the server.
 * @param {string} id - The ID of the item to be deleted from the cart.
 * @returns {Promise} A promise that resolves to the response object from the server.
 */
export async function deleteItemFromCart(id) {
  return await axios.delete(`${url}cart/${id}`); // Returns a response object
}
