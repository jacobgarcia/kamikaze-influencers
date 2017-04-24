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

  static getTimeItems() {
    return axios.get((`${window.baseUrl}/items`))
  }

  static signinUser(user) {
    return axios.post(`${window.baseUrl}/users/authenticate`, { user })
  }

  static setUser(callback, errCallback) {
    return axios.post(`${window.baseUrl}/users`)
  }

  static updateLiking(liking) {
    return axios.put(`${window.baseUrl}/users/self/liking`, { liking })
  }

  static updateCommenting(commenting) {
    return axios.put(`${window.baseUrl}/users/self/commenting`, { commenting })
  }

  static updateFollowing(following) {
    return axios.put(`${window.baseUrl}/users/self/following`, { following })
  }

  static getHallOfFame() {
    return axios.get(`${window.baseUrl}/automation/self/start`)
  }

  static startAutomation() {
    return axios.post(`${window.baseUrl}/automation/self/start`)
  }

  static setTime() {

  }

  static setPayment(item_id) {
    return axios.post(`${window.baseUrl}/payments`, { item_id })
  }

  static setPaymentConfimation(payment) {
    return new Promise((resolve, reject) => {
      axios.post(`${window.baseUrl}/users/self/payments`, { payment })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
  }

  static setUsernames(usernames) {
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/usernames`, { usernames })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
  }

  static setLocations(locations) {
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/locations`, { locations })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
  }

  static setTags(tags) {
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/tags`, { tags })
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
