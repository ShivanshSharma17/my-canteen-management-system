import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CartModal = () => {
  return <div>
    <Modal.Dialog>
  <Modal.Header closeButton>
    <Modal.Title>Cart Is Not Empty</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p>Do you want to remove already exsiting items!!!</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary">Yes</Button>
    <Button variant="primary">Cancel</Button>
  </Modal.Footer>
</Modal.Dialog>
  </div>
}

export default CartModal;