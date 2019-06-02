import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap'


export default class Header extends Component {
    render() {
        return (
            <div className="button-holder">
                <Button className="friends-num-btn" style={{ border: '1px solid #2CB79C', color: "#2CB79C", }} outline>
                    Number of Tasks:   <Badge color="secondary">{this.props.countTodo} </Badge>
                </Button>
            </div>
        )
    }
}