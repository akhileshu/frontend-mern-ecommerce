import axios from "axios";
const url = "http://localhost:8080/";

export async function fetchAllProducts() {
  //TODO: we will not hard-code server URL here
  return await axios.get(`${url}products`);
  // we are returning response
}



export async function fetchProductsByFilters(filter,sort,pagination) {
  // filter = {"category": ["smartphone", "tablet"], "brand": ["apple", "samsung"]}
  // sort ={_sort:"price",_order="desc"}
  // TODO: on the server, we will support multi values
  let queryString = "";

  for (let key in filter) {//filter = obj with 2 pairs {category:[....],brands:[....]}
    const categoryValues = filter[key];
    if(categoryValues.length>0){//array should have something
      const lastCategoryValue=categoryValues[categoryValues.length-1]
      queryString+=`${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){//sort = { _sort: option.sort, _order: option.order };
    queryString+=`${key}=${sort[key]}&`
  }
  for(let key in pagination){//pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    queryString += `${key}=${pagination[key]}&`
  }

  const response=await axios.get(`${url}products?${queryString}`);
  const totalItems = await response.headers.get('X-Total-Count')
  // when they  do response.data they get a object with 2 pairs
  return {data:{products:response.data,totalItems:+totalItems}}
}
export async function fetchProductById(id) {
  return await axios.get(`${url}products/${id}`);
}
export async function fetchCategories() {
  return await axios.get(`${url}categories`);
}
export async function fetchBrands() {
  return await axios.get(`${url}brands`);
}

