const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    return array.reduce((sum, item) => sum + item.likes, 0 )
}

module.exports = {
    dummy, totalLikes
}