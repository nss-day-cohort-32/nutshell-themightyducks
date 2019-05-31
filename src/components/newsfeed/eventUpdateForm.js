import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import API from '../dbCalls/dbCalls';

export default class EventUpdateForm extends React.Component {

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    updateForm = () => {
        const newsObj = {
            userId: parseInt(this.props.currentUserId),
            type: "event",
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            eventDate: this.state.eventDate,
            postDate: Date.now()
        }
        console.log("update", newsObj)
        API.patch("newsfeed", this.props.newsItem.id, newsObj)
    }

    render() {
        const item = this.props.newsItem

        return (
            <Form>
                <FormGroup>
                    <Label for="eventName">Event Name</Label>
                    <Input type="text" name="eventName" id="title" placeholder="Event Name" onChange={this.handleFieldChange} defaultValue={item.title} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDate">Date</Label>
                    <Input type="date" name="eventDate" id="eventDate" onChange={this.handleFieldChange} defaultValue={item.eventDate} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventLocation">Location</Label>
                    <Input type="url" name="eventLocation" id="url" onChange={this.handleFieldChange} defaultValue={item.url} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDescription">Description</Label>
                    <Input type="textarea" name="text" id="description" onChange={this.handleFieldChange} defaultValue={item.description} />
                </FormGroup>
                <Button onClick={() => {
                    this.updateForm()
                    this.props.getSetAndPushNewsfeed()
                    this.props.toggle()
                }}>Submit</Button>
            </Form >
        );
    }
}