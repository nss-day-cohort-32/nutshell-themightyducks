import React, { Component } from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Route, Redirect } from "react-router-dom"
import firebase from 'firebase';
import fire from '../../config/Fire';

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

    testaction = () => {
        console.log("tied to github link")
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.testaction} href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                            <NavItem>
                                <button onClick={this.logoutRedirect} >Logout</button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default TopNav
