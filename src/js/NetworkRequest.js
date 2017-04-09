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

  static setUser(callback, errCallback) {
    axios.post(`${window.baseUrl}/users`)
    .then((res) => {
      callback(res)
    })
    .catch((error) => {
      errCallback(error)
    })
  }

  static updateLiking(likingActive) {
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/actions`, { linking: likingActive })
      .then((response) => resolve(response))
      .catch((error) => reject(errir))
    })
  }

  static updateCommenting(comment) {
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/actions`, { commenting: true })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
  }

  static updateFollowing() {
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/actions`, { following: true })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
  }

  static getHallOfFame() {
    return new Promise ((resolve, reject) => {
      axios(`${window.baseUrl}/halloffame`)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
  }

  static setPayment() {

  }

  static setTime() {

  }

  static setPayment(id) {
    return new Promise(function(resolve, reject) {
      axios.post(`${window.baseUrl}/payments`)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })

  }

  static getToken(code, callback, errCallback) {
    axios.post(`${window.baseUrl}/users/authenticate`, { code })
    .then((response) => callback(response))
    .catch((error) => errCallback(error))
  }

  static getProfile() {
    return new Promise((resolve, reject) => {
      axios(`${window.baseUrl}/users/self`)
      .then((res) => resolve(res))
      .catch((error) => reject(error))
    })

  }

}

export default NetworkRequest
