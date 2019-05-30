import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ArticleUpdateForm extends React.Component {
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
        console.log(this.props)
        return (
            < Form >
                <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="Title" onChange={this.handleFieldChange} value="" />
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
                <Button>Submit</Button>
            </Form >
        );
    }
}