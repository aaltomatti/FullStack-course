import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const testblog = {
  title: 'Testing',
  author: 'Testaaja',
  url: 'www.google.fi',
  user: {},
  likes: 0
}

test('When creating new blog, the form calls the correct callback function with the correct parameters', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} setNotification={() => {}} setErrorMessage={() => {}} />)

  var title = screen.getByPlaceholderText('Title')
  var author = screen.getByPlaceholderText('Author')
  var url = screen.getByPlaceholderText('URL')

  await user.type(title, testblog.title)
  await user.type(author, testblog.author)
  await user.type(url, testblog.url)

  const submitbutton = screen.getByText('create')
  await user.click(submitbutton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(testblog)
})