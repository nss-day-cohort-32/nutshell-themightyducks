import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';
import API from '../dbCalls/dbCalls';


class FriendButton extends Component {


    constructNewFriend = (userId, friendUserId) => {
        const newFriend = {
            userId: parseInt(userId),
            friendUserId: friendUserId
        }

        this.props.addFriend(newFriend)
    }


    render() {
        const userId = sessionStorage.getItem("id");
        return (
            <>

                <Button className="add-friend-btn" outline color="primary" onClick={this.constructNewFriend(userId, this.props.message.userId)}>Add Friend</Button>

            </>
        );
    }
}
export default FriendButton;
