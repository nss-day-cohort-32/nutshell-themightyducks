/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import ArticleForm from './articleForm';
import EventsForm from './eventsForm';


class AddFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      formtype: ""
    };

    this.toggle = this.toggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSelect = (event) => {
    this.setState({ formtype: event.target.value })
    }

  render() {
      let formType;
      if (this.state.formtype === "Article") {
          formType = <ArticleForm currentUserId={this.props.currentUserId} addNewsfeed={this.props.addNewsfeed} modal={this.state.modal} toggle={this.toggle} />
      } else if (this.state.formtype === "Event") {
           formType = <EventsForm currentUserId={this.props.currentUserId} addNewsfeed={this.props.addNewsfeed} />
      }

    return (
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <Label for="select">Type</Label>{' '}
            <Input type="select" name="select" id="exampleSelect" onChange={this.handleSelect}>
                <option value="SelectForm">Select</option>
                <option value="Article">Article</option>
                <option value="Event">Event</option>
            </Input>
          </FormGroup>
          {' '}
          <Button color="danger" onClick={this.toggle}>Add an Item</Button>
        </Form>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Add an {this.state.formtype}</ModalHeader>
          <ModalBody>
            {formType}
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default AddFormModal;