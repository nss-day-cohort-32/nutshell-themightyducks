import React, { Component } from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Badge
} from 'reactstrap';
import main from "../../main.css"
import { conditionalExpression } from '@babel/types';
import FriendButton from "./FriendButton"
import ButtonOptions from "./ButtonOptions"
export default class MessageItem extends Component {

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
                    (this.props.relationships && this.props.relationships.friends) ? (
                        <Card key={this.props.message.id} className="friend-card">
                            <CardHeader className="message-card-header" >
                                <div className="message-user-container">
                                    <img className="message-image" src={this.props.message.user.userPhoto} ></img>
                                    <h6>{this.props.message.user.userName}</h6>
                                </div>
                                <p></p>
                            </CardHeader>
                            <CardBody className="friend-card-body">
                                <CardText>{this.props.message.postedTime}: "{this.props.message.message}"</CardText>
                                <ButtonOptions key={this.props.message.id} message={this.props.message} relationships={this.props.relationships} deleteMessage={this.props.deleteMessage} />

                            </CardBody>
                        </Card>
                    ) : null
                }
            </>
        )
    }

}