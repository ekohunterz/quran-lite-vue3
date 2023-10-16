//import axios
import axios from 'axios'

const Api = axios.create({
  //set default endpoint API
  baseURL: 'https://equran.id'
})

export default Api
