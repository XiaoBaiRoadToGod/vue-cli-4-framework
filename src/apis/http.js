import axios from 'axios'

import baseUrl from './baseUrl'
const token = null
axios.defaults.timeout = 5000
axios.defaults.baseURL = baseUrl
axios.interceptors.request.use( config => {
  if ( token ) {
    config.headers.Authorization = `token ${token}`
  }
  if ( config.method === 'POST' ) {
    config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
  return config
} )

axios.interceptors.response.use(
  ( response, promise ) => {
    return Promise.resolve( response.data )
  },
  ( err, promise ) => {
    console.log( err.message )
    return promise.resolve()
  }
)

export default axios
