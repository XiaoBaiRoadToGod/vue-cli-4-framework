import axios from './http'
const user = {
  getUserInfo: ( p ) => axios.get( '/bespeakApi/region/regionCityList', p )
}

export default user
