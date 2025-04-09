import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
// export const LOGIN_URL = `${API_URL}/login`
// export const LOGIN_URL = `http://uat.api.payplatter.in:8082/auth/sign-in`
export const LOGIN_URL = 'http://uat.api.payplatter.in:8082/auth/sign-in'
// export const LOGIN_URL = 'http://103.151.107.59:8180/auth/login'

export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`



// Server should return AuthModel
export function login(username: string, password: string) {
  return axios.post<{
    access_token: string
    refresh_token: string
    user_name: string
    merchant_id: number
    roles: string
  }>(LOGIN_URL, {
    username,
    password,
  })
}


// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  // If your backend supports verifying JWT or fetching user info by token
  return axios.post<UserModel>(`${process.env.REACT_APP_API_URL}/verify_token`, {
    token,
  })
}
