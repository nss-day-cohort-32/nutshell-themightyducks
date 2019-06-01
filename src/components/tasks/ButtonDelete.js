import React, { Component } from 'react';
import { Button } from "reactstrap"


export default class ButtonDelete extends Component {



    render() {
        return <Button className={`${this.props.className} delete-completed`} onClick={() => this.props.deleteCompleted()} className="delete-message-btn" outline color="danger" >{this.props.text}
        </Button>

    }

}