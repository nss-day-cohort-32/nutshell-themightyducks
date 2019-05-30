import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';

import main from "../../main.css"


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
                                        // console.log(`userId, ${userId}`, `message.userId, ${message.userId}`)
                                        (userId == message.userId) ?
                                            (<>
                                                <Button className="edit-message-btn" outline color="warning">Edit</Button>
                                                <Button onClick={() => this.props.deleteMessage(message.id)} className="delete-message-btn" outline color="danger">Delete
                                                </Button>
                                            </>
                                            ) : (console.log("x"))
                                    }
                                    {
                                        // (this.props.friends.map(friend => {
                                        //     (friend.id !== this.props.user.)
                                        // }))
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
