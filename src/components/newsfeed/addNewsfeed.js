import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ArticleForm from './articleForm';
import EventsForm from './eventsForm';
import API from '../dbCalls/dbCalls';


// onselect if News if value render artivle if value 2 render event form
export default class NewsfeedForm extends React.Component {

    state = {
        type: ""
    }

    handleSelect = (event) => {
        this.setState({ type: event.target.value })
    }

    addNewfeed = (data) => {
        API.post("newfeed", data)
    }


    render() {
        console.log(this.state)
        let formType
        if (this.state.type === "ArticleForm") {
            return formType = <ArticleForm currentUserId={this.props.currentUserId} addNewsfeed={this.addNewsfeed} />
        } else if (this.state.type === "EventsForm") {
            return formType = <EventsForm currentUserId={this.props.currentUserId} addNewsfeed={this.addNewsfeed} />
        } else {

        }
        return (
            <Form>
                <FormGroup>
                    <Label for="exampleSelect">Type</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={this.handleSelect}>
                        <option value="SelectForm">Select</option>
                        <option value="ArticleForm">Article</option>
                        <option value="EventsForm">Event</option>
                    </Input>
                </FormGroup>
                {formType}
            </Form>
        );
    }
}