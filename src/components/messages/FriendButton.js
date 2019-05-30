import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';
import API from '../dbCalls/dbCalls';


class FriendButton extends Component {
    state = {
    }

    // {
    //   "id": 1,
    //   "userId": 1,
    //   "friendUserId": 2
    // }

    // addFriend = (userId) => {
    //     const newfriendObj = {
    //         userId: 
    //     }

    //     API.addFriend
    // }

    render() {
        const userId = sessionStorage.getItem("id");
        return (
            <>
                {
                    (this.props.relationships) ?
                        (
                            <>
                                <Button className="add-friend-btn" outline color="primary">Add Friend</Button>
                            </>
                        ) : (null)
                }
            </>
        );
    }
}
export default FriendButton;
