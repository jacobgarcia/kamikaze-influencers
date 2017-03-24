import axios from 'axios'

const token = window.localStorage.getItem('token')
//
// axios.interceptors.request.use((config) => {
//   console.log('config', config)
//   config.cancelToken = (somehting) => console.log(somehting)
//   config.dataType = 'jsonp'
//   config['Access-Control-Allow-Origin'] = '*'
// }, (err) => {
//   console.log('error interceptor', err)
// })

class NetworkRequest {
  constructor() {

  }

  static getProfile(callback, errCallback) {
    axios.get('https://api.instagram.com/v1/users/self')
    .then((response) => {
      callback(response)
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
  }

}

export default NetworkRequest
