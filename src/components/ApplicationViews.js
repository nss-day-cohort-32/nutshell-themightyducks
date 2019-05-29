import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import NewsFeed from "./newsfeed/Newsfeed"
import TopNav from "./nav/TopNav"
import Auth from "./auth/Auth"

class ApplicationViews extends Component {
    state = {}

    isAuthenticated = () => localStorage.getItem("user") !== null


    render() {
        return (
            <>
                <Route path="/auth" component={Auth} />

                <Route exact path="/newsfeed" render={(props) => {
                    return <NewsFeed />
                    // if (this.isAuthenticated()) {
                    //     return (
                    //         <NewsFeed />
                    //     )
                    // } else {
                    //     console.log("no user")
                    //     return (
                    //         <Redirect to="/auth" component={Auth} />
                    //     )
                    // }
                }} />

                <Route exact path="/friends" render={(props) => {

                }} />
            </>
        )
    }
}

export default ApplicationViews
