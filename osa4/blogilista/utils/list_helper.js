const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0 )
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => {
        if (blog.likes > favorite.likes){
            favorite = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
        return favorite
    }
    return blogs.length === 0
    ? 'No blogs'
    : blogs.reduce(reducer, { title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes })
}
module.exports = {
    dummy, totalLikes, favoriteBlog
}