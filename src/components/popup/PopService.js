import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function PopService({ onClose, onCloseWithoutChange }) {
  const [show, setShow] = useState(true);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleClose = () => {
    setShow(false);
    const data = {
      description: description,
      price: price,
    };
    onClose(data);
  };

  const handleCloseWithoutSave = () => {
    setShow(false);
    onCloseWithoutChange();
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseWithoutSave}>
        <Modal.Header closeButton>
          <Modal.Title>* Required Fields</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="*description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="*price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWithoutSave}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopService;
