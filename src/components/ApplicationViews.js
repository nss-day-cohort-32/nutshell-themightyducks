import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import NewsFeed from "./newsfeed/Newsfeed"
import TopNav from "./nav/TopNav"
import Auth from "./auth/Auth"
import API from "./dbCalls/dbCalls"

class ApplicationViews extends Component {

    state = {
        newsfeed: [],
        friends: [],
        users: []
    }

    isAuthenticated = () => localStorage.getItem("user") !== null

    componentDidMount() {
        let newState = {}
        API.getUserInfo(1)
            .then(user => newState.newsfeed = user.newsfeed)
            .then(() => this.setState(newState))
    }

    render() {
        return (
            <>
                <Route path="/auth" component={Auth} />

                <Route exact path="/newsfeed" render={(props) => {
                    // return <NewsFeed />
                    console.log("Function is evaluating")
                    if (this.isAuthenticated()) {
                        return (
                            <NewsFeed newsfeed={this.state.newsfeed} />
                        )
                    } else {
                        console.log("no user")
                        return (
                            <Redirect to="/auth" component={Auth} />
                        )
                    }
                }} />

                {/* <Route exact path="/newsfeed/:newsfeed(\d+)/edit" render={props => {
                    return <EditFormNewsFeed {...props} newsfeed={this.state.newsfeed} />
                }} /> */}

                <Route exact path="/friends" render={(props) => {

                }} />
            </>
        )
    }
}

export default ApplicationViews
