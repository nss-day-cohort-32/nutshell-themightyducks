import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import NewsFeed from "./newsfeed/Newsfeed"
import TopNav from "./nav/TopNav"
import Auth from "./auth/Auth"
import API from "./dbCalls/dbCalls"
import { verify } from "crypto";


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
        //We'll likely need to change this after we figure out why a refresh is needed to show newsfeed after login
        let newState = {}
        let id = sessionStorage.getItem("id");

        if (this.isAuthenticated()) {
            API.getUserInfo(id)
                .then(user => {
                    newState.newsfeed = user.newsfeed
                    newState.friends = user.friends
                    newState.messages = user.messages
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
    // verifyEmail = (email) => {
        // API.getUserID(email)
    // }


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
                }} />
            </>
        )
    }
}

export default ApplicationViews
