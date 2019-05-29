import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import fire from '../../config/Fire';
import App from "../../App"


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
            modal: false,
            error: []
        }
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log(u)
                localStorage.setItem('user', u.uid);
                this.props.history.push('/newsfeed')
            })
            .catch((error) => {
                newState.modal = !this.state.modal
                newState.error = error.message
                this.setState(newState)
            })
    }

    signup = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => {
            console.log(u)
            console.log("email", this.state.email)
        })

    }
    render() {

        return (
            <>
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                        <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
                    </form>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} onClose={this.closeModal} centered={true}>
                    <ModalHeader toggle={this.toggle}>Login Error</ModalHeader>
                    <ModalBody>
                        {this.state.error}
                    </ModalBody>
                </Modal>
            </>
        );
    }
}
export default Auth;
