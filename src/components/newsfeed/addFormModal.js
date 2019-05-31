/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import ArticleForm from './articleForm';
import EventsForm from './eventsForm';
import EventUpdateForm from './eventUpdateForm';


class AddFormModal extends React.Component {

  render() {
      let formType;
      if (this.props.formtype === "Article") {
          formType = <ArticleForm currentUserId={this.props.currentUserId} addNewsfeed={this.props.addNewsfeed} modal={this.props.modal} toggle={this.props.toggle} />
      } else if (this.props.formtype === "Event") {
           formType = <EventsForm currentUserId={this.props.currentUserId} addNewsfeed={this.props.addNewsfeed} modal={this.props.modal} toggle={this.props.toggle} />
      }
    //   else if (this.props.formtype === "article") {
    //     formType = <ArticleUpdateForm currentUserId={this.props.currentUserId} modal={this.props.modal} toggle={this.props.toggle} newsfeed={this.props.newsfeed} />}
     else if (this.props.formtype === "event") {
       formType = <EventUpdateForm currentUserId={this.props.currentUserId} modal={this.props.modal} toggle={this.props.toggle} newsfeed={this.props.newsfeed} />
     }

    return (
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <Label for="select">Type</Label>{' '}
            <Input type="select" name="select" id="exampleSelect" onChange={this.props.handleSelect}>
                <option value="SelectForm">Select</option>
                <option value="Article">Article</option>
                <option value="Event">Event</option>
            </Input>
          </FormGroup>
          {' '}
          <Button color="danger" onClick={this.props.toggle}>Add an Item</Button>
        </Form>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
          <ModalHeader toggle={this.props.toggle}>Add an {this.props.formtype}</ModalHeader>
          <ModalBody>
            {formType}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddFormModal;