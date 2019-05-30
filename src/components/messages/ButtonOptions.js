import React, { Component } from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';
import main from "../../main.css"
import { conditionalExpression } from '@babel/types';
import FriendButton from "./FriendButton"

export default class ButtonOptions extends Component {

    // checkRelationship = (message, userId) => {
    //     if (this.props.relationships) {
    //         this.props.relationships.friends.filter(friend => {
    //             if (message.user.id == userId) {
    //                 console.log("message user is same as user")
    //             }
    //             if (message.user.id == userId) {
    //                 console.log("1")
    //             } else if (message.user.id !== friend.friendUserId) {
    //                 return <FriendButton key={message.id} relationships={this.props.relationships} user={this.props.user} addFriend={this.props.addFriend} />
    //             } else {
    //                 console.log("2")
    //             }
    //         })
    //     }
    //     else {
    //         console.log("nope")
    //     }
    // }


    render() {
        const userId = sessionStorage.getItem("id");
        return (
            <>
                {
                    (userId == this.props.message.userId) ?
                        (<>
                            <Button key={this.props.message.id} className="edit-message-btn" outline color="warning">Edit</Button>
                            <Button onClick={() => this.props.deleteMessage(this.props.message.id)} className="delete-message-btn" outline color="danger">Delete
                                                        </Button>
                        </>
                        ) : (null)
                }
                {
                    (this.props.relationships.friends[0].friendUserId !== this.props.message.user.id) ? (console.log(this.props.relationships.friends[0].friendUserId !== this.props.message.user.id)) : (null)
                }
            </>
        )
    }

}