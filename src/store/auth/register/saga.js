import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"

import { postRegister } from "helpers/auth_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
   
    const response = yield call(postRegister, {
      email: user.email,
      password: user.password,
    })
    localStorage.setItem("authUser", JSON.stringify(response))
    yield put(registerUserSuccessful(response))
} catch (error) {
  yield put(registerUserFailed(error?.response?.data?.message))
}
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
