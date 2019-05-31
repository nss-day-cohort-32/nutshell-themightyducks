import React, { Component } from 'react';
import { Button } from 'reactstrap';


export default class ButtonOptions extends Component {


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
                            <Button key={this.props.message.id} className="edit-message-btn" outline color="warning">Edit</Button>
                            <Button onClick={() => this.props.deleteMessage(this.props.message.id)} className="delete-message-btn" outline color="danger">Delete
                            </Button>

                        </>
                        ) : (null)
                }
                {
                    (this.determineIfFriend()) ? (null) : (<Button key={this.props.message.id} className="edit-message-btn" outline color="primary">Add Friend</Button>)
                }
            </>
        )
    }

}