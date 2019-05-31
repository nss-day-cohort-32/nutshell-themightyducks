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

    addFriend = (newFriendObj) => {
        // API.addFriend(newFriendObj)
        //     .then(() => API.getMessages()
        //         .then(messages => {
        //             this.setState({ messages: messages })
        //         })
        //     )
    }

    componentDidMount() {
        // Declaring new state
        const newState = {
            friends: [],
            messages: [],
        }

        const id = sessionStorage.getItem("id")
        dbCalls.getFriends(id)
            .then(friends => {
                newState.friends = friends
                this.setState(newState)
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
        }
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
                <Route path="/auth" component={Auth} />

                <Route exact path="/newsfeed" render={(props) => {

                    if (this.isAuthenticated()) {
                        return (
                            <NewsFeed newsfeed={this.state.newsfeed} deleteNewsItem={this.deleteNewsItem} addNewsfeed={this.addNewsfeed} currentUserId={this.state.currentUserId} toggle={this.toggle} modal={this.state.modal} handleSelect={this.handleSelect} formtype={this.state.formtype} handleDbleClick={this.handleDbleClick} />
                        )
                    } else {
                        return (
                            <Redirect to="/auth" component={Auth} />
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
                            <Redirect to="/auth" component={Auth} />
                        )
                    }
                }} />

                <Route exact path="/tasks" render={(props) => {
                    if (this.isAuthenticated()) {
                        return (
                            <Tasks />
                        )
                    } else {
                        console.log("no user")
                        return (
                            <Redirect to="/auth" component={Auth} />
                        )
                    }
                }} />

                <Route exact path="/messages" render={(props) => {
                    if (this.isAuthenticated()) {
                        return (
                            <Messages messages={this.state.messages} deleteMessage={this.deleteMessage} friends={this.state.friends} user={this.state.user} relationships={this.state.relationships} addFriend={this.addFriend} />
                        )
                    } else {
                        console.log("no user")
                        return (
                            <Redirect to="/auth" component={Auth} />
                        )
                    }
                }} />
            </>
        )
    }
}

export default withRouter(ApplicationViews)
