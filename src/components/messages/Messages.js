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
        console.log(this.props.messages)
        const userId = sessionStorage.getItem("id");
        return (
            <>
                <TitleBar title="Messages" />

                {
                    (this.props.messages) ?
                        (this.props.messages.map(message =>
                            <Card key={message.id} className="friend-card">
                                <CardHeader className="friend-card-header" >
                                    {/* <img className="profile-image" src={friend.userPhoto} style={{ border: '2px solid #2CB79C' }}></img>
                                    <h3>{message.userName}</h3> */}
                                </CardHeader>
                                <CardBody className="friend-card-body">
                                    {/* <CardTitle></CardTitle> */}
                                    {/* <CardText>{friend.userName} is: {friend.status}</CardText>
                                    <Button className="delete-friend-btn" onClick={() => this.props.deleteFriend(friend.id, userId)} outline color="danger">Delete</Button> */}
                                </CardBody>
                            </Card>
                        )) : (null)
                }
            </>
        );
    }
}
export default Messages;
