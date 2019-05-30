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
            const todo = {
                id: Date.now(),
                task: this.state.todoValue,
                done: false,
            }
            this.setState({
                todoValue: "",
                todos: [todo, ...this.state.todos],
            })
        }
    }

    handleToggle = (id) => {
        this.setState((prevState) => {
            return {
                todos: prevState.todos.map((item, i) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            done: !prevState.todos[i].done,
                        }
                    }
                    return item;
                })
            }
        })
    }
    //Not using this as of now
    // handleDelete = (id) => {
    //     this.setState({
    //         todos: this.state.todos.filter(item => item.id !== id)
    //     })
    // }

    deleteCompleted = () => {
        this.setState({
            todos: this.state.todos.filter(item => !item.done)
        })
    }

    getVisibleTodos = () => {
        const filterType = this.state.filterType;
        let filterState = null;
        switch (filterType) {
            case "Completed":
                return filterState = this.state.todos.filter(item => item.done);
            case "Active":
                return filterState = this.state.todos.filter(item => !item.done);
            default:
                return filterState = this.state.todos;
        }
    }

    setActiveFilter = (text) => {
        this.setState({
            filterType: text,
        })
    }

    // componentDidMount(){
    //    // iterate over todos, create a todos obj with state.todos types and add to state.todos array.
    //    console.log("thisPROPStodos", this.props.todos)
    //    let newTodos = []
    //    this.props.todos.forEach(API_task => {
    //        let todoOBJ = {
    //            id : "",
    //            done : false,
    //            task : API_task.task
    //        }
    //     newTodos.push(todoOBJ)
    //     });
    //     console.log("newTodos:", newTodos)
    //     this.setState({
    //         todos: newTodos
    //     })
    // }

    render() {
        console.log("TASKS State = ", this.state)
        console.log("TASKS todos = ", this.props.todos)
        return (
            <>
            <TitleBar title="Tasks" />
            <div className="container">
                <Header countTodo={this.state.todos.length} />
                <Form //handleDelete={this.handleDelete}
                    deleteTask={this.props.deleteTask}
                    handleToggle={this.handleToggle}
                    handleClick={this.handleClick}
                    handleChange={this.handleChange}
                    todoValue={this.state.todoValue}
                    // todos={this.getVisibleTodos()} />
                    todos={this.props.todos} />
                <Footer setActiveFilter={this.setActiveFilter}
                    deleteCompleted={this.deleteCompleted}
                    filter={this.state.filterType} />
            </div>
            </>
        )
    }
}
