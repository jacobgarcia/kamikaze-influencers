import axios from 'axios'

const token = window.localStorage.getItem('token')

// Authorization header interceptor
axios.interceptors.request.use((config) => {
  // Get last url route and check if it's different from authenticate to add header
  if (config.url.split('/').pop() !== 'authenticate')
    config.headers.Authorization = `Bearer ${token}`

  return config
}, (error) => {
    return Promise.reject(error)
})

class NetworkRequest {
  constructor() {

  }

  static setUser(callback, errCallback) {
    axios.post(`${window.baseUrl}/users`)
    .then((res) => {
      callback(res)
    })
    .catch((error) => {
      errCallback(error)
    })
  }

  static setLiking() {

  }

  static disableLiking() {

  }

  static setCommenting(comment) {

  }

  static disableCommenting() {

  }

  static setFollowing() {

  }

  static disableFollowing() {

  }

  static getHallOfFame() {

  }

  static setPayment() {

  }

  static setTime() {

  }

  static getToken(code, callback, errCallback) {
    axios.post(`${window.baseUrl}/users/authenticate`, { code })
    .then((res) => {
      callback(res)
    })
    .catch((error) => {
      errCallback(error)
    })
  }

  static getProfile(callback, errCallback) {
    axios(`${window.baseUrl}/users/self`)
    .then((res) => {
      callback(res)
    })
    .catch((error) => {
      errCallback(error)
    })
  }

}

export default NetworkRequest
