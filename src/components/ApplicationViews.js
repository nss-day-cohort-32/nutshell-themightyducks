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
// import main from "../main.css"


class ApplicationViews extends Component {

    state = {
        newsfeed: [],
        friends: [],
        messages: [],
        tasks: [],
        currentUserId: ""
    }

    isAuthenticated = () => localStorage.getItem("user") !== null

    componentDidMount() {
        // Declaring new state
        const newState = {
            friends: []
        }

        const id = sessionStorage.getItem("id")

        dbCalls.getFriends(1)
            .then(friends => {
                newState.friends = friends
                this.setState(newState)
            })

        if (this.isAuthenticated()) {
            API.getUserInfo(id)
                .then(user => {
                    newState.newsfeed = user.newsfeed
                    newState.friends = user.friends
                    newState.messages = user.messages
                    newState.tasks = user.tasks
                    newState.currentUserId = id
                })
                .then(() => this.setState(newState))
        }
    }

    //Colin
    deleteFriend = (friends, idtodelete) => {
        const newState = {}
        const userId = sessionStorage.getItem("id")
        dbCalls.delete(friends, idtodelete)
            .then(() => dbCalls.getFriends(1))
            .then(friends => {
                newState.friends = friends
            })
            .then(() => {
                this.props.history.push("/friends")
                this.setState(newState);
            })

    }



    render() {


        return (
            <>
                <Route path="/auth" component={Auth} />

                <Route exact path="/newsfeed" render={(props) => {

                    if (this.isAuthenticated()) {
                        return (
                            <NewsFeed newsfeed={this.state.newsfeed} />
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
                            <Friends friends={this.state.friends} {...props} />
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
                            <Messages />
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
