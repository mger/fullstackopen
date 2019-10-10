import axios from 'axios'

const base = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(base)
  return request.then(response => response.data)
}

const add = (newEntry) => {
  const request = axios.post(base, newEntry)
  return request.then(response => response.data)
}

const deleteSingle = (id) => {
  const request = axios.delete(`${base}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, add, deleteSingle }
