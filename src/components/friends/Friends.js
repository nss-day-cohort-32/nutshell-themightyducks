import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';

import main from "../../main.css"


class Friends extends Component {



    render() {
        return (
            <>
                <TitleBar title="Friends" />
                {
                    (this.props.friends) ?
                        (this.props.friends.map(friend =>
                            <Card key={friend.id} className="friend-card">
                                <CardHeader className="card-header">
                                    <img className="profile-image" src={friend.userPhoto}></img>
                                    <h3>{friend.userName}</h3>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle></CardTitle>
                                    <CardText>{friend.userName} is: {friend.status}</CardText>
                                    <Button className="hidden">Go somewhere</Button>
                                    <Button onClick={this.props.deleteFriend}>Delete Friend</Button>
                                </CardBody>
                            </Card>
                        )) : (null)
                }
            </>
        );
    }
}
export default Friends;
