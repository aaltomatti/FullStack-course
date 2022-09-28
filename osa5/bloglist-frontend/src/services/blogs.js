import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const headers = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBlog, headers)
  return res.data
}

const update = async (updatedBlog, blogId) => {
  const headers = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blogId}`
  const res = await axios.put(url, updatedBlog, headers)
  return res.data
}

const remove = async (blogId) => {
  const headers = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blogId}`
  const res = await axios.delete(url, headers)
  return res.data
}

export default { getAll, setToken, create, update, remove }