import axios from 'axios'

//Запросы всех пользователей
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

//Запросы авторизованных пользователей
const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
