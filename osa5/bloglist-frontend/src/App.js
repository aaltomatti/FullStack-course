import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('LoggedBloglistappUser')
    if (loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
      setUsername(user.username)
    }

  }, [])
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
  }
  const likeBlog = async (blogObject) => {
    var likedBlog = {
      user: blogObject.user.id,
      likes: blogObject.likes+1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }
    await blogService.update(likedBlog, blogObject.id)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))
  }
  const deleteBlog = async (blog, blogId) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(blogId)
    }
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('LoggedBloglistappUser', JSON.stringify(user))
    } catch (error) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleError = () => {
    if (errorMessage===null){
      return null
    }
    return(
      <h2 className="errormessage">
        {errorMessage}
      </h2>
    )
  }


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
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>Create new</h2>
            <BlogForm createBlog={addBlog} setErrorMessage={setErrorMessage} setNotification={setNotification}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} username={username}/>
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