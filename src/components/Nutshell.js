import React, { Component } from "react"
import TopNav from "./nav/TopNav"
import ApplicationViews from "./ApplicationViews"
import { withRouter, Route } from 'react-router'
import fire from '../config/Fire';
import Auth from "./auth/Auth"
import dbCalls from "./dbCalls/dbCalls"
import API from "./dbCalls/dbCalls"


class Nutshell extends Component {
    state = {
        user: null
    }
    setNutshellState = () => {
        console.log("Setting New Nutshell State")
        //this.authListener()
        this.setState()
    }


    componentDidMount = () => {
        console.log("Nutshell Mounted")
        this.authListener();
    }

    authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            console.log("authListener - Nutshell - user:", user)

            if (user) {
                console.log("NUTSHELL - email ", user.email)
                API.getUserID(user.email)
                    .then(result => {
                        localStorage.setItem('user', user.uid);
                        sessionStorage.setItem('id', parseInt(result[0].id))
                        console.log("NUTSHELL - Setting Session Storage - ", user)
                    }).then(_next => {
                        this.setState({ user });
                    })
                } else {
                    this.setState({ user: null });
                    localStorage.clear();
                    sessionStorage.clear();
                    }
            })
    }
    render() {
        return (
            <>
                {
                    this.state.user ? (
                        <>
                            <TopNav />
                            <ApplicationViews />
                        </>) : <Auth setNutshellState={this.setNutshellState} />//(<Route path="/auth" component={Auth} />)
                }
            </>
        )
    }
}

export default withRouter(Nutshell)

