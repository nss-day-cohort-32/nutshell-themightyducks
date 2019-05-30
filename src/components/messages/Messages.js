import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';

import main from "../../main.css"
import { conditionalExpression } from '@babel/types';
import FriendButton from "./FriendButton"


class Messages extends Component {
    state = {
    }

    render() {

        const userId = sessionStorage.getItem("id");
        return (
            <>
                <TitleBar title="Messages" />

                {
                    (this.props.messages) ?
                        (this.props.messages.map(message =>
                            <Card key={message.id} className="friend-card">
                                <CardHeader className="message-card-header" >
                                    <div className="message-user-container">
                                        <img className="message-image" src={message.user.userPhoto} ></img>
                                        <h6>{message.user.userName}</h6>
                                    </div>
                                    <p></p>
                                </CardHeader>
                                <CardBody className="friend-card-body">
                                    <CardText>{message.postedTime}: "{message.message}"</CardText>
                                    {
                                        (userId == message.userId) ?
                                            (<>
                                                <Button className="edit-message-btn" outline color="warning">Edit</Button>
                                                <Button onClick={() => this.props.deleteMessage(message.id)} className="delete-message-btn" outline color="danger">Delete
                                                </Button>
                                            </>
                                            ) : (console.log("x"))
                                    }
                                    {
                                        (this.props.relationships) ? (
                                            this.props.relationships.friends.map(friend => {
                                                return (message.user.id == userId) ? (null) :
                                                    (message.user.id !== friend.friendUserId) ?
                                                        (<FriendButton key={message.id} relationships={this.props.relationships} user={this.props.user} />) : (null)
                                            })
                                        ) : null
                                    }
                                </CardBody>
                            </Card>
                        )) : (null)
                }
            </>
        );
    }
}
export default Messages;
