/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import MessageForm from './MessageForm';

class MessageModal extends React.Component {

    render() {

        return (
            <div>
                <Form className="messageBtnContainer" inline onSubmit={(e) => e.preventDefault()}>
                    <Button onClick={this.props.toggle}>Add Message</Button>
                </Form>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                    <ModalHeader >Add Message</ModalHeader>
                    <ModalBody>
                        <MessageForm addMessage={this.props.addMessage} toggle={this.props.toggle} currentUserId={this.props.currentUserId} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default MessageModal;