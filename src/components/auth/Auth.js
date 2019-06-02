import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fire from '../../config/Fire';
import App from "../../App"
import TitleBar from "../nav/TitleBar"
import API from "../dbCalls/dbCalls"
import auth from "./auth.css"
import logo from "../../Nutshell-02.svg"


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ApplicationViews from '../ApplicationViews';

class Auth extends Component {

    state = {
        email: '',
        password: '',
        modal: false,
        error: []
    };

    // For modal
    toggle = () => {
        console.log("state", this.state)
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    closeModal = () => {
        const newState = {
            modal: true,
            error: []
        }
        newState.modal = !this.state.modal
        this.setState(newState);
    }

    login = (e) => {
        const newState = {
            modal: true,
            error: []
        }
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { this.props.history.push("/newsfeed") })
            .catch((error) => {
                console.log("ERROR", error)
                newState.modal = !this.state.modal
                newState.error = error.message
                this.setState(newState)
            })
    }

    signup = (e) => {
        // const newState = {
        //     modal: false,
        //     error: []
        // }
        // e.preventDefault();
        // fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        // }).catch((error) => {
        //     console.log("ERROR", error)
        //     newState.modal = !this.state.modal
        //     newState.error = error.message
        //     this.setState(newState)
        // }).then(() => {
        //     let URL = "url"
        //     let newUser = {
        //         email: this.state.email,
        //         password: this.state.password,
        //         url: URL
        //     }
        //     API.post("users", newUser)
        //         .then(() => API.getUserID(this.state.email))
        //         .then(result => sessionStorage.setItem('id', parseInt(result[0].id)))
        // })
    }
    render() {

        return (
            <>
                <div className="col-md-6 auth-form-container">
                    <div className="button-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '20px' }}>
                        <img className="loginlogo" src={logo} style={{ marginBottom: '50px' }}></img>
                    </div>
                    <form>
                        <div className="form-group" style={{ padding: '0px 50px 0px 50px' }}>
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group" style={{ padding: '0px 50px 0px 50px' }}>
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="button-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '20px' }}>
                            <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                            <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
                        </div>
                    </form>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} onClose={this.closeModal} centered={true}>
                    <ModalHeader className="modal-head" toggle={this.toggle}>Login Error</ModalHeader>
                    <ModalBody>
                        {this.state.error}
                    </ModalBody>
                </Modal>
            </>
        );
    }
}
export default Auth;
