import axios from "axios";
const url = "http://localhost:8080/";

// item->{quantity:n,product:{},user:{}}

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
export async function fetchItemsByUserId() {
    // url ->http://localhost:8080/cart/?user=64da3ccd004bf8af265c3811

  return await axios.get(`${url}cart`);
}

/**
 * Updates an item in the cart by making a PATCH request to the server.
 * @param {Object} update - The update object containing the updated item data.
 * @returns {Promise} A promise that resolves to the response object from the server.
 */
export async function updateCart(update) {
  // update->{id,quantity}
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
export async function resetCart() {
  // get all items of user's cart - and then delete each
  const response = await fetchItemsByUserId();
  const allItemsInCart = response.data;
  for (const item of allItemsInCart) {
    deleteItemFromCart(item.id);
  }
  return { status: "success" };
}
