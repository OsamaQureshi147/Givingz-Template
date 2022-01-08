import { toast } from "react-toastify"

export const validateSummary = values => {
  if (!values.name) {
    toast.error("Name is required")
    return false
  } else if (!values.productDesc) {
    toast.error("Description is required")
    return false
  } else if (!values.skuCode) {
    toast.error("SKU is required")
    return false
  } else if (!values.stock) {
    toast.error("Stock info is required")
    return false
  } else if (!values.sellingPrice) {
    toast.error("Selling price is required")
    return false
  } else if (!values.cashback) {
    toast.error("Regular price is required")
    return false
  } else if (!values.quantityAvailable) {
    toast.error("Quantity info is required")
    return false
  } else if (!values?.categories) {
    toast.error("categories are required")
    return false
  }
  return true
}

export const validateImages = (image, images,values) => {
  if (!image?.length) {
    toast.error("Default image is required")
    return false
  } else if (!images?.length) {
    toast.error("Gallery images are required")
    return false
  }
  else if (!images?.length) {
    toast.error("Gallery images are required")
    return false
  }


  return true
}
