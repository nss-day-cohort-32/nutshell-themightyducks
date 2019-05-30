const db = "http://localhost:8080"

const API = {
    getUserInfo: (userId) => {
        return fetch(`${db}/users/${userId}?_embed=friends&_embed=tasks&_embed=newsfeed`)
            .then(w => w.json())
    },
    getUserID: (email) => {
        console.log(email)
        return fetch(`${db}/users/?email=${email}`)
            .then(w => w.json())
    },
    getFriendNewsfeed: (userId) => {
        return fetch(`${db}/users/${userId}?_embed=friends`)
            .then(w => w.json())
            .then(users => {
                const data = users.friends.map(friend => {
                    //console.log(friend)
                    let friendId = friend.friendUserId
                    return fetch(`${db}/users/${friendId}?_embed=newsfeed`)
                        .then(w => w.json())
                })
                return Promise.all(data)
            })
    },
    delete: (resource, id) => {
        return fetch(`${db}/${resource}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    post: (resource, data) => {
        return fetch(`${db}/${resource}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(e => e.json())
    },
    put: (resource, id, data) => {
        return fetch(`${db}/${resource}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(e => e.json())

    },
    getFriends: (userId) => {
        return fetch(`${db}/users/${userId}?_embed=friends`)
            .then(results => results.json())
            .then(users => {
                const data = users.friends.map(friend => {
                    let friendId = friend.friendUserId
                    return fetch(`${db}/users/${friendId}`)
                        .then(results => results.json())
                })
                return Promise.all(data)
            })
    }
}

export default API
