import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ArticleForm extends React.Component {
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
        console.log(evt)
    }

    render() {
        console.log(this.state)
        return (
            < Form >
                <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input type="text" name="title" id="articleTitle" placeholder="Title" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="">Date Published</Label>
                    <Input type="date" name="articleDate" id="eventDate" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="url">Link</Label>
                    <Input type="url" name="url" id="articleUrl" placeholder="url" onChange={this.handleFieldChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="synopsis">Synopsis</Label>
                    <Input type="textarea" name="text" id="description" onChange={this.handleFieldChange} />
                </FormGroup>
                <Button>Submit</Button>
            </Form >
        );
    }
}

