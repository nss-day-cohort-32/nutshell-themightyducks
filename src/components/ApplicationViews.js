import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
// import NewsFeed from "./newsfeed/NewsFeed.js"

class ApplicationViews extends Component {
    state = {}

    render() {
        return (
            <>
                <h1>Login!</h1>
                <Route exact path="/newsfeed" render={(props) => {
                    // return <NewsFeed />
                }} />

                <Route exact path="/friends" render={(props) => {
                    // return <NewsFeed />
                }} />
            </>
        )
    }
}

export default ApplicationViews
