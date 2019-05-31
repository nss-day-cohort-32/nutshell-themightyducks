import React, { Component } from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import NewsFeed from "./newsfeed/Newsfeed"
import TopNav from "./nav/TopNav"
import Auth from "./auth/Auth"
import TitleBar from "./nav/TitleBar"
import Friends from "./friends/Friends"
import Tasks from "./tasks/Tasks"
import Messages from "./messages/Messages"
import dbCalls from "./dbCalls/dbCalls"
import API from "./dbCalls/dbCalls"
import { verify } from "crypto";

class ApplicationViews extends Component {
    state = {
        newsfeed: [],
        friends: [],
        messages: [],
        tasks: [],
        currentUserId: "",
        modal: false,
        formtype: []
    }

    isAuthenticated = () => localStorage.getItem("user") !== null
    addMessage = (obj) => {
        API.post("messages", obj)
            .then(() => API.getMessages())
            .then(messages => {
                console.log(messages)
                const newState = {}
                newState.messages = messages
                this.setState(newState)
            })
    }
    addFriend = (newFriendObj) => {
        // API.addFriend(newFriendObj)
        //     .then(() => API.getMessages()
        //         .then(messages => {
        //             this.setState({ messages: messages })
        //         })
        //     )
    }

    componentDidMount() {
        console.log("AppViews Mounted")

        const newState = {
            friends: [],
            messages: [],
        }

        const id = sessionStorage.getItem("id")
        console.log("APPV MOUNT SESSION ID:", id)
        dbCalls.getFriends(id)
            .then(friends => {
                newState.friends = friends
                this.setState(newState)
            }).then(_next => {
                console.log("IsAUTH")
                API.getUserInfo(id)
                    .then(user => {
                        newState.newsfeed = user.newsfeed
                        newState.tasks = user.tasks
                        newState.currentUserId = id
                    })
                    .then(() => API.getFriendNewsfeed(id))
                    .then(friends => friends.map(friend =>
                        friend.newsfeed.map(news =>
                            newState.newsfeed.push(news)
                        )
                    ))
                    .then(() => this.setState(newState))
            })


        API.getMessages()
            .then(messages => {
                console.log(messages)
                newState.messages = messages
                this.setState(newState)
            })

        API.getFriendsRelationships(id)
            .then(relationships => {
                newState.relationships = relationships
                this.setState(newState)
            })



        if (this.isAuthenticated()) {
            API.getUserInfo(id)
            //if (this.isAuthenticated()) {

            //}
        }
    }

    loadUserData = () => {


        // Declaring new state
        const newState = {
            friends: []
        }
        const id = sessionStorage.getItem("id")
        dbCalls.getFriends(id)
            .then(friends => {
                newState.friends = friends
                //this.setState(newState)
            }).then(_next => API.getUserInfo(id)
                .then(user => {
                    newState.newsfeed = user.newsfeed
                    newState.tasks = user.tasks
                    newState.currentUserId = id
                }))
            .then(() => API.getFriendNewsfeed(id))
            .then(friends => friends.map(friend =>
                friend.newsfeed.map(news =>
                    newState.newsfeed.push(news)
                )
            ))
            .then(() => this.setState(newState))

    }


    getSetAndPushNewsfeed = () => {
        const newState = {}
        const userId = this.state.currentUserId
        API.getUserInfo(userId)
            .then(user => {
                newState.newsfeed = user.newsfeed
            })
            .then(() => API.getFriendNewsfeed(userId))
            .then(friends => friends.map(friend =>
                friend.newsfeed.map(news =>
                    newState.newsfeed.push(news)
                )
            ))
            .then(this.props.history.push("/newsfeed"))
            .then(() => this.setState(newState))
    }

    addNewsfeed = (data) => {
        API.post("newsfeed", data)
            .then(() => this.getSetAndPushNewsfeed())
    }

    //Colin

    deleteFriend = (friendId, userId) => {
        const newState = {}

        if (window.confirm("Are you sure you want to ruin this friendship?")) {
            dbCalls.deleteFriend(friendId, userId)
                .then(() => dbCalls.getFriends(userId))
                .then(friends => {
                    newState.friends = friends
                })
                .then(() => {
                    this.props.history.push("/friends")
                    this.setState(newState);
                })
        }
    }
    //Jason
    deleteTask = (idToDelete) => {
        const newState = {}
        const userId = sessionStorage.getItem("id")
        const url = "tasks"
        API.delete(url, idToDelete)
            .then(() => dbCalls.getTasks(userId)).then(tasks => {
                newState.tasks = tasks
            }).then(() => { this.setState(newState) })
    }
    postTask = (objToPost) => {
        const newState = {}
        const userId = sessionStorage.getItem("id")
        const url = "tasks"
        API.post(url, objToPost)
            .then(() => dbCalls.getTasks(userId))
            .then(tasks => {
                newState.tasks = tasks
            })
            .then(() => {
                this.setState(newState);
            })
    }
    handleToggle = (id) => {
        let newState = {}
        const userId = sessionStorage.getItem("id")
        API.getTask(id)
            .then(task => {
                let value = !(task.done)
                let obj = task
                obj.done = value
                API.put("tasks", id, obj).then(() => API.getTasks(userId).then(results => {
                    newState.tasks = results
                }).then(() => {
                    this.setState(newState)
                }))
            })
    }
    deleteCompleted = () => {
        const userId = sessionStorage.getItem("id")
        let newState = {}
        let obj = {}
        API.getTasks(userId).then(tasks => {
            obj.tasks = tasks.filter(item => item.done)
        }).then(results => obj.tasks.forEach(element => {
            console.log(element.id)
            this.deleteTask(element.id)
        }))
    }

    deleteMessage = (messageId) => {
        const newState = {}

        if (window.confirm("Are you sure you want to delete this message?")) {
            dbCalls.deleteMessage(messageId)
                .then(() => API.getMessages()
                    .then(messages => {
                        newState.messages = messages
                        this.setState(newState)
                    })
                )
        }
    }


    //Carly - toggle function for modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    //changes formtype state to tell modal which form to display
    handleSelect = (event) => {
        this.setState({ formtype: event.target.value })
    }

    handleDbleClick = (event, newsItemType) => {
        console.log("doubleclick", event)
        console.log("dbl", newsItemType)
        this.setState({ formtype: newsItemType })
    }


    //Carly and Jake - calls the newsfeeds of the current user and their friends, sets a new newsfeed state and sends the user back to their updated newsfeed page
    getSetAndPushNewsfeed = () => {
        const newState = {}
        const userId = this.state.currentUserId
        API.getUserInfo(userId)
            .then(user => {
                newState.newsfeed = user.newsfeed
            })
            .then(() => API.getFriendNewsfeed(userId))
            .then(friends => friends.map(friend =>
                friend.newsfeed.map(news =>
                    newState.newsfeed.push(news)
                )
            ))
            .then(() => {
                this.props.history.push("/newsfeed")
                this.setState(newState)
            })
    }



    //Carly
    deleteNewsItem = (newsfeed, newsItemId) => {
        API.delete(newsfeed, newsItemId)
            .then(() => this.getSetAndPushNewsfeed())
    }



    render() {
        return (
            <>
                <Route path="/auth" component={Auth} loadUserData={this.loadUserData} />

                <Route exact path="/newsfeed" render={(props) => {

                    if (this.isAuthenticated()) {
                        return (
                            <NewsFeed newsfeed={this.state.newsfeed} deleteNewsItem={this.deleteNewsItem} addNewsfeed={this.addNewsfeed} currentUserId={this.state.currentUserId} toggle={this.toggle} modal={this.state.modal} handleSelect={this.handleSelect} formtype={this.state.formtype} handleDbleClick={this.handleDbleClick} />
                        )
                    } else {
                        return (
                            <Redirect to="/auth" component={Auth} loadUserData={this.loadUserData} />
                        )
                    }
                }} />
                <Route exact path="/friends" render={(props) => {
                    if (this.isAuthenticated()) {
                        return (
                            <Friends friends={this.state.friends} deleteFriend={this.deleteFriend} {...props} />
                        )
                    } else {
                        console.log("no user")
                        return (
                            <Redirect to="/auth" component={Auth} loadUserData={this.loadUserData} />
                        )
                    }
                }} />

                <Route exact path="/tasks" render={(props) => {
                    if (this.isAuthenticated()) {
                        return (
                            <Tasks todos={this.state.tasks} deleteTask={this.deleteTask}
                                postTask={this.postTask} handleToggle={this.handleToggle}
                                deleteCompleted={this.deleteCompleted} />
                        )
                    } else {
                        console.log("no user")
                        return (
                            <Redirect to="/auth" component={Auth} loadUserData={this.loadUserData} />
                        )
                    }
                }} />

                <Route exact path="/messages" render={(props) => {
                    if (this.isAuthenticated()) {
                        return (
                            <Messages messages={this.state.messages} deleteMessage={this.deleteMessage} friends={this.state.friends} user={this.state.user} relationships={this.state.relationships} addFriend={this.addFriend} modal={this.state.modal} toggle={this.toggle} addMessage={this.addMessage} currentUserId={this.state.currentUserId} />
                        )
                    } else {
                        console.log("no user")
                        return (
                            <Redirect to="/auth" component={Auth} loadUserData={this.loadUserData} />
                        )
                    }
                }} />
            </>
        )
    }

}

export default withRouter(ApplicationViews)
