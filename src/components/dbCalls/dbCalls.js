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
        })//.then(e => e.json())
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
    patch: (resource, id, data) => {
        return fetch(`${db}/${resource}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
    },
    getFriends: (userId) => {
        console.log("Get Friends of ID#:", userId)
        return fetch(`${db}/users/${userId}?_embed=friends`)
            .then(results => results.json())
            .then(users => {
                if (users.length !== 0) {
                    const data = users.friends.map(friend => {
                        let friendId = friend.friendUserId
                        return fetch(`${db}/users/${friendId}`)
                            .then(results => results.json())
                    })
                    return Promise.all(data)
                }
            })
    },
    deleteFriend: (friendId, userId) => {
        return fetch(`${db}/friends/?friendUserId=${friendId}&_userId=${userId}`)
            .then(response => response.json())
            .then(friendRelationship => {
                return fetch(`${db}/friends/${friendRelationship[0].id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            })
    },
    getMessages: () => {
        return fetch(`${db}/messages?_expand=user`)
            .then(response => response.json())
    },
    deleteMessage: (id) => {
        return fetch(`${db}/messages/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    getFriendsRelationships: (userId) => {
        return fetch(`${db}/users/${userId}?_embed=friends`)
            .then(response => response.json())
    },
    addFriend: (obj) => {
        return fetch(`${db}/friends`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(e => e.json())
    },
    getTasks: (userId) => {
        return fetch(`${db}/tasks/?userId=${userId}`)
            .then(results => results.json())
    },
    getTask: (id) => {
        return fetch(`${db}/tasks/${id}`)
            .then(results => results.json())
    }

}

export default API
