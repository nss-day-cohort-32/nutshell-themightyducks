import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import NewsFeed from "./newsfeed/Newsfeed"
import TopNav from "./nav/TopNav"
import Auth from "./auth/Auth"
import API from "./dbCalls/dbCalls"
import { verify } from "crypto";


class ApplicationViews extends Component {
    state = {}

    isAuthenticated = () => localStorage.getItem("user") !== null

    // verifyEmail = (email) => {
        // API.getUserID(email)
    // }


    render() {
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

                }} />
            </>
        )
    }
}

export default ApplicationViews
