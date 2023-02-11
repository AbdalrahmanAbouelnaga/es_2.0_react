import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://estore2.up.railway.app',
    headers: sessionStorage.getItem('token')?{Authorization:"Token "+JSON.parse(sessionStorage.getItem('token')).token}:{}
})


export default axiosInstance