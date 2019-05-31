import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import API from '../dbCalls/dbCalls';

export default class ArticleUpdateForm extends React.Component {

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    updateForm = () => {
        const newsfeed = {
            userId: parseInt(this.props.currentUserId),
            type: "article",
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            eventDate: this.state.eventDate,
            postDate: Date.now()
        }
        console.log(this.props.newsItem)
        API.patch("newsfeed", this.props.newsItem.id, newsfeed)
    }
    render() {
        return (
            < Form >
                <FormGroup>
                    <Label for="Title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="Title" onChange={this.handleFieldChange} defaultValue={this.props.newsItem.title} />
                </FormGroup>
                <FormGroup>
                    <Label for="">Date Published</Label>
                    <Input type="date" name="articleDate" id="eventDate" onChange={this.handleFieldChange} defaultValue={this.props.newsTitle} />
                </FormGroup>
                <FormGroup>
                    <Label for="url">Link</Label>
                    <Input type="url" name="url" id="url" placeholder="Url" onChange={this.handleFieldChange} defaultValue={this.props.newsItem.url} />
                </FormGroup>
                <FormGroup>
                    <Label for="synopsis">Synopsis</Label>
                    <Input type="textarea" name="text" id="description" onChange={this.handleFieldChange} defaultValue={this.props.newsItem.description} />
                </FormGroup>
                <Button onClick={() => { this.updateForm(); this.props.toggle() }}>Submit</Button>
            </Form >
        );
    }
}