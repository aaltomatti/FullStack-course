import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing',
  url: 'www.google.fi',
  author: 'Testaaja',
  likes: 10,
  user: 'Tester'
}

test('renders title, but not url or likes', () => {

  render(<Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} username = "Tester"/>)

  const element = screen.getByText('Testing')
  expect(element).not.toHaveStyle('display: none')
})

test('clicking button to show blog details works correctly', async () => {
  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} username = "Tester"/>)

  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('www.google.fi')
  const likes = container.querySelector('.likes')
  const author = screen.getByText('Testaaja')

  expect(url).not.toHaveStyle('display: none')
  expect(likes).not.toHaveStyle('display: none')
  expect(author).not.toHaveStyle('display: none')



})
test('Clicking like button twice for a blog, the component callback function is called twice', async () => {

  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} likeBlog={mockHandler} deleteBlog={() => {}} username = "Tester"/>)

  const viewbutton = screen.getByText('view')
  await user.click(viewbutton)

  const likebutton = screen.getByText('like')

  await user.click(likebutton)
  await user.click(likebutton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})
