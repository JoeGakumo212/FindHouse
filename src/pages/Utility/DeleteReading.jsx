import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { parseCookies } from 'nookies';
const  DeleteReading = ({reading, onClose, onConfirmDelete }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <>
    <div className='modal-dialog modal-dialog-centered'>
    <Modal show={true} onHide={closeModal} >
      <Modal.Header closeButton className="bg-danger">
        <Modal.Title className="text-light">
          Confirm Permanent Action. This cannot be undone.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirmDelete}>
          Confirm
        </Button>
        <Button variant="primary" onClick={onClose}>
          close
        </Button>
      </Modal.Footer>
    </Modal>
    <div className="modal" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
    </>
   
  );
};

export default  DeleteReading;
