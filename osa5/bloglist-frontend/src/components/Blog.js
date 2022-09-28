import { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, username }) => {
  const [open, setOpen] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle}>
      {blog.title}
      {open === false ?
        <button onClick={() => setOpen(!open)}>
        view
        </button>
        :
        <><button onClick={() => setOpen(!open)}>
        hide
        </button>
        <div>
          {blog.url}<br></br>
          {blog.likes}
          <button onClick={() => likeBlog(blog)}>like</button><br></br>
          {blog.author}<br></br>
          {console.log(username)}
          {blog.user.username === username ?
            <button onClick={() => deleteBlog(blog, blog.id)}>
                        delete
            </button> :
            <></>}
        </div></>
      }
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog