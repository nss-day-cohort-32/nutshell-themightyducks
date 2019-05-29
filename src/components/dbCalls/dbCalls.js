const db = "http://localhost:8080"

const API = {
    getUserInfo: (userId) => {
        return fetch(`${db}/users/${userId}?_embed=friends&_embed=tasks&_embed=newsfeed`)
            .then(w => w.json())
            .then(r => console.log(r))
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
            .then(r => console.log(r))
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

    }
}

export default API
