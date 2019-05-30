import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';

import main from "../../main.css"


class Friends extends Component {
    state = {
    }

    render() {
        const userId = sessionStorage.getItem("id");
        let numfriends
        if (this.props.friends) {
            numfriends = this.props.friends.length
        } else {
            console.log("cant do it")
        }
        return (
            <>
                <TitleBar title="Friends" />
                <div className="button-holder">
                    <Button color="primary" outline>
                        Number of Friends -   <Badge color="secondary">{numfriends}</Badge>
                    </Button>
                </div>
                {
                    (this.props.friends) ?
                        (this.props.friends.map(friend =>
                            <Card key={friend.id} className="friend-card">
                                <CardHeader className="friend-card-header">
                                    <img className="profile-image" src={friend.userPhoto}></img>
                                    <h3>{friend.userName}</h3>
                                </CardHeader>
                                <CardBody className="friend-card-body">
                                    {/* <CardTitle></CardTitle> */}
                                    <CardText>{friend.userName} is: {friend.status}</CardText>
                                    <Button className="delete-friend-btn" onClick={() => this.props.deleteFriend(friend.id, userId)} outline color="danger">Delete</Button>
                                </CardBody>
                            </Card>
                        )) : (null)
                }
            </>
        );
    }
}
export default Friends;
