const db = "http://localhost:8080"

const API = {
    getUserInfo: (userId) => {
        return fetch(`${db}/users/${userId}?_embed=friends&_embed=tasks&_embed=newsfeed`)
            .then(w => w.json())
            .then(users => console.log(users))
    },
    getFriendNewsfeed: (userId) => {
        return fetch(`${db}/users/${userId}?_embed=friends`)
            .then(w => w.json())
            .then(users => {
                const data = users.friends.map(friend => {
                    let friendId = friend.friendUserId
                    return fetch(`${db}/users/${friendId}?_embed=newsfeed`)
                        .then(w => w.json())
                })
                return Promise.all(data)
            })
    }
}

export default API
