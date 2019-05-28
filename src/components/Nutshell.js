import React, { Component } from "react"
import TopNav from "./nav/TopNav"
import ApplicationViews from "./ApplicationViews"
import { withRouter, Route } from 'react-router'
import fire from '../config/Fire';
import Auth from "./auth/Auth"

class Nutshell extends Component {
    state = {
        user: null
    }

    componentDidMount = () => {
        this.authListener();
    }

    authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            console.log("user", user);
            if (user) {
                this.setState({ user });
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
        });
    }

    render() {
        return (
            <>
                {
                    this.state.user ? (
                        <>
                            <TopNav />
                            <ApplicationViews />
                        </>) : (<Route path="/auth" component={Auth} />)
                }
            </>
        )
    }
}

export default withRouter(Nutshell)

