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

  static updateUnfollowing(unfollowing) {
    return axios.put(`${window.baseUrl}/users/self/unfollowing`, { unfollowing })
  }

  static updateComment(comment_text) {
    return axios.put(`${window.baseUrl}/users/self/comment`, { comment_text })
  }

  static updateFameFollowers(user_id) {
    return axios.put(`${window.baseUrl}/users/self/follow`, { user_id })
  }

  static updateSpeed(speed) {
    return axios.put(`${window.baseUrl}/users/self/speed`, { speed })
  }

  static updateChanged(changed) {
    return axios.put(`${window.baseUrl}/users/self/changed`, { changed })
  }


  static startAutomation() {
    return axios.post(`${window.baseUrl}/automation/self/start`)
  }

  static stopAutomation() {
    return axios.put(`${window.baseUrl}/automation/self/stop`)
  }

  static setPayment(item_id) {
    return axios.post(`${window.baseUrl}/payments`, { item_id })
  }

  static getPayment(paymentId) {
    return axios.get(`${window.baseUrl}/payments/${paymentId}/transactions`)
  }

  static setUsernames(usernames) {
    return axios.put(`${window.baseUrl}/users/self/usernames`, { usernames })
  }

  static setLocations(locations) {
    return axios.put(`${window.baseUrl}/users/self/locations`, { locations })
  }

  static setTags(tags) {
    return axios.put(`${window.baseUrl}/users/self/tags`, { tags })
  }

  static setFilteredTags(filtertags) {
    return axios.put(`${window.baseUrl}/users/self/filtertags`, { filtertags })
  }

  static setFilteredUsers(filterusers) {
    return axios.put(`${window.baseUrl}/users/self/filterusers`, { filterusers })
  }

  static setFilteredKeys(filterkeys) {
    return axios.put(`${window.baseUrl}/users/self/filterkeys`, { filterkeys })
  }

  static getToken(code, callback, errCallback) {
    return axios.post(`${window.baseUrl}/users/authenticate`, { code })
  }

  static getProfile() {
    return axios.get(`${window.baseUrl}/users/self`)
  }

  static getHallOfFame() {
    return axios.get(`${window.baseUrl}/users/self/famous`)
  }

  static getHallOfFollowing() {
    return axios.get(`${window.baseUrl}/users/self/famous/following`)
  }

  static getInstagramId() {
    return axios.get(`${window.baseUrl}/users/self/instagram/id`)
  }

  static setPaymentExecution(paymentId, payerId) {
    return axios.post(`${window.baseUrl}/payments/execute`, { paymentId, payerId })
  }

  static getAutomationStats() {
    return axios.get(`${window.baseUrl}/automation/self/stats`)
  }


}

export default NetworkRequest
