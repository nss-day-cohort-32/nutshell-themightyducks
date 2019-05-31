import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import Header from "./Header"
import Footer from "./Footer"
import Form from "./Form"
import "./tasks.css"
import TitleBar from "../nav/TitleBar"



export default class Tasks extends Component {

    state = {
        todoValue: "",
        filterType: "All",
        // todos: []
        todos: []
    }
    //This updates state every time a character is entered into the FORM input
    handleChange = (event) => {
        this.setState({
            todoValue: event.target.value,
        })
    }
    //This handles the clicking of the ADD button
    handleClick = (event) => {
        event.preventDefault();
        if (this.state.todoValue !== "") {
            const userId = parseInt(sessionStorage.getItem("id"))
            const todo = {
                //id: Date.now(),
                entered: Date.now(),
                userId: userId,
                task: this.state.todoValue,
                done: false
            }
            this.setState({
                    todoValue: "",
                    todos: [todo, ...this.state.todos],
                })
            console.log("NEW OBJ", todo)
            this.props.postTask(todo)
        }
    }

    handleToggle = (id) => {
        console.log("HANDLE TOGGLE")
        this.setState((prevState) => {
            return {
                todos: this.props.todos.map((item, i) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            done: !this.props.todos[i].done,
                        }
                    }
                    return item;
                })
            }
        })
    }
    handleDelete = (id) => {
        this.setState({
            todos: this.state.todos.filter(item => item.id !== id)
        })
    }


    getVisibleTodos = () => {
        const filterType = this.state.filterType;
        let filterState = null;
        switch (filterType) {
            case "Completed":
                return filterState = this.props.todos.filter(item => item.done);
            case "Active":
                return filterState = this.props.todos.filter(item => !item.done);
            default:
                return filterState = this.props.todos;
        }
    }

    setActiveFilter = (text) => {
        this.setState({
            filterType: text,
        })
    }




    render() {

        console.log("TASKS State = ", this.state)
        console.log("TASKS todos = ", this.props.todos)
        return (
            <>
                <TitleBar title="Tasks" />
                <div className="container">
                    <Header countTodo={this.props.todos.length} />
                    <Form handleDelete={this.handleDelete}
                        deleteTask={this.props.deleteTask}
                        handleToggle={this.props.handleToggle}
                        handleClick={this.handleClick}
                        handleChange={this.handleChange}
                        todoValue={this.state.todoValue}
                        // todos={this.getVisibleTodos()} />
                        todos={this.props.todos} />
                    <Footer setActiveFilter={this.setActiveFilter}
                        deleteCompleted={this.props.deleteCompleted}
                        filter={this.state.filterType} />
                </div>
            </>
        )
    }
}
