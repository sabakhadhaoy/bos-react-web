import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import '../styles/App.css';

export default class ModalLoading extends Component {
  render() {
    if (this.props.isError) {
      return (
        <div>
          <Modal
            contentClassName="modalcontent-error"
            size="sm"
            isOpen={this.props.open}
            toggle={this.props.toggleModal}
            className="modalbody"
          >
            <ModalBody>
              {this.props.errMessage}
            </ModalBody>
          </Modal>
        </div>
      )
    }
    else if (this.props.isSuccess) {
      return (
        <div>
          <Modal
            contentClassName="modalcontent-success"
            size="sm"
            isOpen={this.props.open}
            toggle={this.props.toggleModal}
            backdrop="static"
          >
            <ModalBody >
              {this.props.succMessage}
            </ModalBody>
            <div style={{ marginBottom: 5 }}>
              <Button color="primary" size="sm" onClick={this.props.onClick}>Okay</Button>
            </div>
          </Modal>
        </div>
      )
    }
    else {
      return (
        <div>
          <Modal
            contentClassName="modalcontent-loading"
            size="sm"
            backdrop="static"
            isOpen={this.props.open}
            toggle={this.props.toggleModal}
          >
            <ModalBody >
              <div><i className="fa fa-spinner fa-spin"></i> Loading...</div>
            </ModalBody>
          </Modal>
        </div>
      )
    }
  }
}