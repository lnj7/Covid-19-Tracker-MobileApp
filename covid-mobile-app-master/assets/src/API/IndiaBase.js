import Axios from 'axios'
export default Axios.create({
    baseURL:"https://api.covid19india.org/data.json"
})