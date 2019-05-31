import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class MessageForm extends React.Component {

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    render() {
        return (
            < Form >
                <FormGroup>
                    <Label for="Title">Thoughts</Label>
                    <Input type="text" name="title" id="title" placeholder="What's on your mind?😜" onChange={this.handleFieldChange} />
                </FormGroup>
                <Button onClick={() => {
                    this.contructNewNewsfeed()
                    this.props.toggle()
                }}>Submit</Button>
            </Form >
        );
    }
}

