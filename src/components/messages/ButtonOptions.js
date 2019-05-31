import React, { Component } from 'react';
import { Button } from 'reactstrap';
import FriendButton from "./FriendButton"


export default class ButtonOptions extends Component {
    state = {
        saveDisabled: false
    }

    determineIfFriend = () => {
        const userId = sessionStorage.getItem("id");
        const messageCreatorId = this.props.message.userId
        let friendIds = []
        let friendsArray = this.props.relationships.friends
        for (var i = 0; i < friendsArray.length; i++) {
            friendIds[i] = friendsArray[i].friendUserId
        }
        friendIds.push(parseInt(userId));
        let isFriend = false;

        for (var i = 0; i < friendIds.length; i++) {
            if (friendIds[i] === messageCreatorId || userId === messageCreatorId) {
                isFriend = true
            }
        }
        return isFriend
    }

    render() {
        const userId = sessionStorage.getItem("id");
        return (
            <>
                {
                    (userId == this.props.message.userId) ?
                        (<>
                            <Button onClick={() => this.props.deleteMessage(this.props.message.id)} className="delete-message-btn" outline color="danger">Delete
                            </Button>

                        </>
                        ) : (null)
                }
                {
                    (this.determineIfFriend()) ? (null) : (<FriendButton key={this.props.message.id} disabled={this.state.saveDisabled} message={this.props.message} className="edit-message-btn" outline color="primary" addFriend={this.props.addFriend}>Add Friend</FriendButton>)
                }
            </>
        )
    }

}