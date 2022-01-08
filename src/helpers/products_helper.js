import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

const listAllProducts = data => post(url.GET_ALL_PRODUCTS, data)
const addProduct = data => post(url.ADD_PRODUCT, data)




export {
  listAllProducts,
  addProduct,
}
