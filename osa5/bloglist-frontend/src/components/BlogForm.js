import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, setNotification, setErrorMessage }, user, ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newblog = {
      title: title,
      author: author,
      url: url,
      user: user,
      likes: 0
    }
    try {
      createBlog(newblog)
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <label>Title:</label>
      <input type="title" value={title} onChange={({ target }) => setTitle(target.value) } placeholder="Title" /><br></br>
      <label>Author:</label>
      <input type="author" value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="Author" /><br></br>
      <label>URL:</label>
      <input type="url" value={url} onChange={({ target }) => setUrl(target.value)} placeholder="URL" /><br></br>
      <input type="submit" value="create" />
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default BlogForm