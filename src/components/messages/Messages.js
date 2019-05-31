import React, { Component } from 'react';

import TitleBar from "../nav/TitleBar"



import MessageItem from "./MessageItem"

const userId = sessionStorage.getItem("id");


class Messages extends Component {
    state = {
        relationships: {
            friends: []
        },
    }


    render() {

        const userId = sessionStorage.getItem("id");
        return (
            <>
                <TitleBar title="Messages" />
                {
                    (this.props.messages) ? (
                        this.props.messages.map(message => {
                            return <MessageItem key={message.id} message={message} relationships={this.props.relationships} deleteMessage={this.props.deleteMessage} />
                        })
                    ) : null
                }
            </>
        )
    }
}
export default Messages;
