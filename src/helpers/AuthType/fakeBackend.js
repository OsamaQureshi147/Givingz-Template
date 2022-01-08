import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import * as url from "../url_helper"
import accessToken from "../jwt-token-access/accessToken"
import {
  calenderDefaultCategories,
  cartData,
  chats,
  comments,
  contacts,
  cryptoOrders,
  customerData,
  events,
  groups,
  invoiceList,
  messages,
  orders,
  productsData,
  projects,
  inboxmails,
  starredmails,
  importantmails,
  draftmails,
  sentmails,
  trashmails,
  recentProducts,
  shops,
  tasks,
  userProfile,
  users as members,
  wallet,
  yearData,
  monthData,
  weekData,
  janTopSellingData,
  decTopSellingData,
  novTopSellingData,
  octTopSellingData,
  janEarningData,
  decEarningData,
  novEarningData,
  octEarningData,
  productComments,
} from "../../common/data"

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
]

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
 
}

export default fakeBackend
