import React, { Component } from 'react';


export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <h6>All To-Do {this.props.countTodo}</h6>
            </header>
        )
    }
}