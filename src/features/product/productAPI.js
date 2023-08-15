import axios from "axios";
const url = "http://localhost:8080/";

/**
 * Fetches all products from the server.
 * @returns {Promise} A promise that resolves to the response object containing the products.
 */
// export async function fetchAllProducts() {
//   // TODO: We will not hard-code the server URL here.
//   return await axios.get(`${url}products`); // Returns the response object containing the products.
// }

/**
 * Fetches products from the server based on filters, sorting, and pagination.
 * @param {Object} filter - The filter object containing category and brand filters.
 * @param {Object} sort - The sorting object containing sort and order options.
 * @param {Object} pagination - The pagination object containing page and item per page options.
 * @returns {Promise} A promise that resolves to an object with products and totalItems count.
 */
export async function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO : on server we will support multi values in filter
  // TODO : Server will filter deleted products in case of non-admin
  let queryString = "";
  // Construct the query string for filters.
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  // Add sorting options to the query string.
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // Add pagination options to the query string.
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }
  // url->http://localhost:8080/products?_page=1&_limit=10&admin=true

  // Fetch the products with the constructed query string.
  const response = await axios.get(`${url}products?${queryString}`);

  // Extract the totalItems count from the response headers.
  const totalItems = await response.headers.get("X-Total-Count");

  // Return an object containing products and totalItems count.
  return {
    data: {
      products: response.data,
      totalItems: +totalItems, // Convert totalItems to a number.
    },
  };
}

/**
 * Fetches a product from the server by its ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise} A promise that resolves to the response object containing the product.
 */
export async function fetchProductById(id) {
  return await axios.get(`${url}products/${id}`); // Returns the response object containing the product.
}

/**
 * Fetches all categories from the server.
 * @returns {Promise} A promise that resolves to the response object containing the categories.
 */
export async function fetchCategories() {
  return await axios.get(`${url}categories`); // Returns the response object containing the categories.
}

/**
 * Fetches all brands from the server.
 * @returns {Promise} A promise that resolves to the response object containing the brands.
 */
export async function fetchBrands() {
  return await axios.get(`${url}brands`); // Returns the response object containing the brands.
}
export async function createProduct(product) {
  return await axios.post(`${url}products`, product); // Returns the response object containing the brands.
}
export async function updateProduct(update) {
  return await axios.patch(`${url}products/${update.id}`, update); // Returns a response object
}
