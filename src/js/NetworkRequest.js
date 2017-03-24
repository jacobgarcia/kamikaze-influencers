import axios from 'axios'

const token = window.localStorage.getItem('token')
const baseUrl = 'http://localhost:8080/v1'

class NetworkRequest {
  constructor() {

  }

  static getProfile(callback, errCallback) {
    axios(`${baseUrl}/users/self?access_token=${token}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

}

export default NetworkRequest
