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
        title: "",
    }

    isAuthenticated = () => localStorage.getItem("user") !== null

    // verifyEmail = (email) => {
    // API.getUserID(email)
    // }


    componentDidMount() {
        // Declaring new state
        const newState = {
            friends: []
        }

        const id = sessionStorage.getItem("id")

        dbCalls.getFriends(1)
            .then(friends => {
                newState.friends = friends
                console.log("newState", newState)
                this.setState(newState)
            })
    }

    render() {
        console.log("path is:", this.props.location.pathname)

        return (
            <>
                <Route path="/auth" component={Auth} />

                <Route exact path="/newsfeed" render={(props) => {
                    // return <NewsFeed />
                    // console.log("Function is evaluating")
                    if (this.isAuthenticated()) {
                        return (
                            <NewsFeed />
                        )
                    } else {
                        //console.log("no user")
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
