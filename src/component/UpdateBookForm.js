import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class UpdateBookForm extends Component {
  update = (e) => {
    this.props.updateBook(e);
    this.props.show();
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.showUpdateModal}
          onHide={this.props.show}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.title1}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => this.update(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Book Name"
                  name="name"
                  onChange={(e) => this.props.handleName(e)}
                  defaultValue={this.props.item.name}
                />
                <Form.Text className="text-muted">
                  Pleas add your book.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  onChange={(e) => this.props.handleDesc(e)}
                  defaultValue={this.props.item.description}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="status"
                  onChange={(e) => this.props.handleStatus(e)}
                  value={this.props.status}
                  defaultValue={this.props.item.status}
                >
                  <option value="lifeChanging">Life Changing </option>
                  <option value="favoriteFive">Favorite Five</option>
                  <option value="recommendedtoMe">Recommended to Me </option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={this.close}>Close</Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default UpdateBookForm;
