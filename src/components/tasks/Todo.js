import React, { Component } from 'react';


export default class Todo extends Component {
    render() {
        console.log("TODO")
        return (
            <ul className="todos-list">
                {
                    this.props.todos.map((item) => {
                        return (
                            <li className="todo-item" key={item.id} onClick={() => this.props.handleToggle(item.id)}>
                                <span className={item.done ? "todo-item__name disabled" : "todo-item__name"}>{item.task}</span>
                                <span className="todo-item__delete-button"
                                      onClick={() => {this.props.handleDelete(item.id)
                                        this.props.deleteTask(item.id)
                                      }}>×</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}