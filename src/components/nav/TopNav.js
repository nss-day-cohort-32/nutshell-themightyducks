import React, { Component } from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, DropdownItem } from 'reactstrap';
import { Route, Redirect } from "react-router-dom"
import firebase from 'firebase';
import fire from '../../config/Fire';
import logo from "../../Nutshell-01.svg"
import navbarcss from "../nav/navbar.css"
import TitleBar from "../nav/TitleBar"

class TopNav extends Component {


    state = {
        collapsed: true
    };

    logout = () => {
        fire.auth().signOut()
            .then(() => {
                localStorage.clear()
            })

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
                <Navbar color="faded" light id="navbar" fixed="true">
                    <img className="mainlogo" src={logo}></img>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <DropdownItem divider />
                            <NavItem>
                                <NavLink style={{ marginLeft: '50px' }} href="/newsfeed/">Newsfeed</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ marginLeft: '50px' }} href="/friends">Friends</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ marginLeft: '50px' }} href="/tasks">Tasks</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{ marginLeft: '50px' }} href="/messages">Messages</NavLink>
                            </NavItem>
                            <DropdownItem divider />
                            <NavItem>
                                <NavLink style={{ marginLeft: '50px' }} href="/auth/" onClick={this.logoutRedirect}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <TitleBar />
            </div>
        );
    }
}


export default TopNav
