import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class EventsForm extends React.Component {
    state = {
        userId: "",
        type: "event",
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
    contructNewNewsfeed = (evt) => {
        // console.log(evt)
        const newsfeed = {
            userId: parseInt(this.props.currentUserId),
            type: this.state.type,
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            eventDate: this.state.eventDate,
            postDate: Date.now()
        }
        console.log(newsfeed)
        this.props.addNewsfeed(newsfeed)

    }
    render() {
        // console.log(this.state)
        console.log(this.props)
        return (
            <Form>
                <FormGroup>
                    <Label for="eventName">Event Name</Label>
                    <Input type="text" name="eventName" id="title" placeholder="Event Name" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDate">Date</Label>
                    <Input type="date" name="eventDate" id="eventDate" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventLocation">Location</Label>
                    <Input type="url" name="eventLocation" id="url" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDescription">Description</Label>
                    <Input type="textarea" name="text" id="description" onChange={this.handleFieldChange} />
                </FormGroup>
                <Button onClick={() => {
                    this.contructNewNewsfeed()
                    this.props.toggle()
                }}>Submit</Button>
            </Form>
        );
    }
}