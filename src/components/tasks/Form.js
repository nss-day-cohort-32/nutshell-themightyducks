import React, { Component } from 'react';
import Todo from "./Todo"


export default class Form extends Component {
    render() {
        console.log("FORM todos", this.props.todos)
        return (
            <form className="form">
                <input type="text" className="form__input"
                placeholder="Add todo" onChange={this.props.handleChange} value={this.props.todoValue}/>

                <button className="form__button" type="submit" onClick={this.props.handleClick}>╋</button>
                <Todo todos={this.props.todos} handleToggle={this.props.handleToggle} 
                handleDelete={this.props.handleDelete}/>
            </form>
        )
    }
}