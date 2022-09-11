import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('LoggedBloglistappUser')
    if (loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])
  const addBlog = async (event) => {
    event.preventDefault()
    const newblog = {
      title: title,
      author: author,
      url: url,
      user: user,
    }
    try {
      await blogService.create(newblog)
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(() =>{
        setNotification(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log(username, password)
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('LoggedBloglistappUser', JSON.stringify(user))
    } catch (error) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }
  const handleError = () =>{
    if (errorMessage===null){
      return null
    }
    return(
      <h2 className="errormessage">
        {errorMessage}
      </h2>
    )
  }
  const blogForm = () => (
      <form on onSubmit={addBlog}>
          <label>Title:</label>
          <input type="title" value={title} name = "Username" onChange={({ target }) => setTitle(target.value)} /><br></br>
          <label>Author:</label>
          <input type="author" value={author} name="Password" onChange={({ target }) => setAuthor(target.value)} /><br></br>
          <label>URL:</label>
          <input type="url" value={url} name="Password" onChange={({ target }) => setUrl(target.value)} /><br></br>
          <input type="submit" value="create" />
      </form>

    )


  const renderLoginOrBlogForm = () => {
    if (user === null) {
      return (
        <div>
          <h1>Log in to application</h1>
          <div>
            {handleError()}
          </div>
          <form onSubmit={handleLogin}>
            <div>
              username:
              <input type="text" value={username} name = "Username" onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
              password:
              <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }
    else{
      return(
        <div>
          <h1>BLOGS</h1>
          {notification === null ?
          <></> :
          <div>
            <h2>{notification}</h2>
          </div>
            }
          <p>{user.name} logged in <button onClick={() => {
              loginService.logout()
              setUser(null)
              }}>logout
            </button>
          </p>
          <h2>Create new</h2>
          {blogForm()}
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      )
    }
  }

  return (
    <div>
      {renderLoginOrBlogForm()}
    </div>
  )
}

export default App