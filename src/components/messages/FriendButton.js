import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';
import API from '../dbCalls/dbCalls';

const userId = sessionStorage.getItem("id");

class FriendButton extends Component {


    constructNewFriend = () => {
        const newFriend = {
            userId: parseInt(userId),
            friendUserId: this.props.message.userId
        }

        this.props.addFriend(newFriend)
    }


    render() {
        const userId = sessionStorage.getItem("id");
        return (
            <>

                <Button className="add-friend-btn" outline color="primary" onClick={this.constructNewFriend}>Add Friend</Button>

            </>
        );
    }
}
export default FriendButton;
