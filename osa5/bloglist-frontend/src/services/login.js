import axios from 'axios'
const baseUrl = '/api/login'

const login = async userInfo => {
  const res = await axios.post(baseUrl, userInfo)
  console.log(res.data)
  return res.data
}
const logout = () => {
  window.localStorage.removeItem('LoggedBloglistappUser')
}

export default { login, logout }