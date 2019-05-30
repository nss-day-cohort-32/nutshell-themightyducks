import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';

import main from "../../main.css"
import { conditionalExpression } from '@babel/types';
import FriendButton from "./FriendButton"

import MessageItem from "./MessageItem"

const userId = sessionStorage.getItem("id");


class Messages extends Component {
    state = {
        relationships: {
            friends: []
        },
    }


    render() {

        const userId = sessionStorage.getItem("id");
        return (
            <>
                {
                    (this.props.messages) ? (
                        this.props.messages.map(message => {
                            return <MessageItem key={message.id} message={message} relationships={this.props.relationships} deleteMessage={this.props.deleteMessage} />
                        })
                    ) : null
                }
            </>
        )
    }
}
export default Messages;
