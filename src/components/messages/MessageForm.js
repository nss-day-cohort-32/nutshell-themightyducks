import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class MessageForm extends React.Component {
    state = {
        userId: "",
        message: "",
        postedTime: ""
    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructMessage = () => {
        const time = new Date()
        const messageObj = {
            userId: this.props.currentUserId,
            message: this.state.message.trim(),
            postedTime: time.toLocaleTimeString()
        }
        this.props.addMessage(messageObj)

    }

    render() {
        return (
            < Form >
                <FormGroup>
                    <Label for="Title">Thoughts</Label>
                    <Input type="text" id="message" placeholder="What's on your mind?😜" onChange={this.handleFieldChange} />
                </FormGroup>
                <Button onClick={() => {
                    this.props.toggle(); this.constructMessage()
                }}>Submit</Button>
            </Form >
        );
    }
}

