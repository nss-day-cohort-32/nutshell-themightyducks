import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ArticleForm extends React.Component {
    state = {
        userId: "",
        type: "article",
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
        console.log(evt)
    }

    contructNewNewsfeed = (evt) => {
        // console.log(evt)
        const newsfeed = {
            userId: this.props.currentUserId,
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
        console.log(this.state)
        return (
            < Form >
                <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="Title" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="">Date Published</Label>
                    <Input type="date" name="articleDate" id="eventDate" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="url">Link</Label>
                    <Input type="url" name="url" id="url" placeholder="Url" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="synopsis">Synopsis</Label>
                    <Input type="textarea" name="text" id="description" onChange={this.handleFieldChange} />
                </FormGroup>
                <Button onClick={this.contructNewNewsfeed}>Submit</Button>
            </Form >
        );
    }
}

