import React, { Component } from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, Redirect } from "react-router-dom"
import firebase from 'firebase';
import fire from '../../config/Fire';
import logo from "../../Nutshell-01.svg"
import navbarcss from "../nav/navbar.css"

class TopNav extends Component {


    state = {
        collapsed: true
    };

    logout = () => {
        fire.auth().signOut();
    }

    logoutRedirect = () => {
        this.logout()
        return <Redirect to="/auth" />
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
            <div>
                <Navbar color="faded" light id="navbar">
                    <img className="mainlogo" src={logo}></img>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/newsfeed/">Newsfeed</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/friends">Friends</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/tasks">Tasks</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/messages">Messages</NavLink>
                            </NavItem>
                            <hr />
                            <NavItem>
                                <NavLink href="/auth/" onClick={this.logoutRedirect}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default TopNav
