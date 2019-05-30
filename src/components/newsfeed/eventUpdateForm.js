import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class EventUpdateForm extends React.Component {
    state = {
        userId: "",
        type: "",
        title: "",
        description: "",
        url: "",
        eventDate: "",
        postDate: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    render() {
        const item = this.props.newsItem

        return (
            <Form>
                <FormGroup>
                    <Label for="eventName">Event Name</Label>
                    <Input type="text" name="eventName" id="title" placeholder="Event Name" onChange={this.handleFieldChange} value={item.title} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDate">Date</Label>
                    <Input type="date" name="eventDate" id="eventDate" onChange={this.handleFieldChange} value={item.eventDate} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventLocation">Location</Label>
                    <Input type="url" name="eventLocation" id="url" onChange={this.handleFieldChange} value={item.url} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDescription">Description</Label>
                    <Input type="textarea" name="text" id="description" onChange={this.handleFieldChange} value={item.description} />
                </FormGroup>
                <Button onClick={() => {
                    this.props.toggle()
                }}>Submit</Button>
            </Form >
        );
    }
}