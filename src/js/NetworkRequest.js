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
    return new Promise((resolve, reject) => {
      axios.get((`${window.baseUrl}/items`))
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
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

  static updateLiking(liking) {
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/liking`, { liking })
      .then((response) => resolve(response))
      .catch((error) => reject(errir))
    })
  }

  static updateCommenting(commenting) {
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/commenting`, { commenting })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
  }

  static updateFollowing(following) {
    console.log('updating ', following)
    return new Promise((resolve, reject) => {
      axios.put(`${window.baseUrl}/users/self/following`, { following })
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


  static setTime() {

  }

  static setPayment(item_id) {
    return new Promise((resolve, reject) => {
      axios.post(`${window.baseUrl}/payments`, { item_id })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
    })
  }

  static setPaymentConfimation(payment) {
    console.log('setPaymentConfimation')
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
