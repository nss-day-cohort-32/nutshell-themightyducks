/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import MessageForm from './MessageForm';

class MessageModal extends React.Component {

    render() {

        return (
            <div>
                <Form inline onSubmit={(e) => e.preventDefault()}>
                    {' '}
                    <Button color="danger" onClick={this.props.toggle}>Add an Item</Button>
                </Form>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.props.toggle}>Add an {this.props.formtype}</ModalHeader>
                    <ModalBody>
                        <MessageForm />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default MessageModal;