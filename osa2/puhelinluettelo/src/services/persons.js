import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = person => {
  const request = axios.post(baseUrl, person)
  return request.then(response => response.data)
}
const pop = id => {
    axios.delete(`${baseUrl}/${id}`)
}
const insert= (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person)
  return request.then(response => response.data)
}
const personService =
{ 
    getAll, 
    create,
    pop,
    insert
}
export default personService;