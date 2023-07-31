import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { parseCookies } from 'nookies';
const EditReadingModal = ({ selectedReading, onClose,  onSaveUpdate  }) => {
  
    const [editedReading, setEditedReading] = useState({ ...selectedReading });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedReading((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSave = async () => {
        try {
            const cookies = parseCookies();
            const tokenFromCookie = cookies.access_token;
        
            const headers = {
              Authorization: `Bearer ${tokenFromCookie}`,
              'Content-Type': 'application/json',
            };
            const response = await axios.put(
                `https://cloudagent.co.ke/backend/api/v1/readings/${editedReading.id}`,
                editedReading, // Move editedReading to be the second argument
                {
                  headers: headers, // Pass headers as the third argument
                }
              );
  
        // Update the editedReading state with the updated data from the response
        setEditedReading(response.data);
      
        // Call the onSave prop function to handle the updated data
        onSaveUpdate (response.data);
  
        // Close the modal after saving
        onClose();
      } catch (error) {
        console.error('Error updating reading:', error);
        // You can handle error states or display an error message here
      }
    };
  
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton className='bg-success'>
        <Modal.Title className='text-light'>Edit Utility Reading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Property</label>
          <input
            type="text"
            name="current_reading"
            value={
              editedReading.property
                ? `${editedReading.property.property_name} (${editedReading.property.property_code})`
                : 'N/A'
            }
            onChange={handleInputChange}
            className="form-control border-dark"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Utility</label>
          <input
            type="text"
            name="current_reading"
            value={editedReading.utility?.utility_display_name ?? 'N/A'}
            onChange={handleInputChange}
            className="form-control  border-dark"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Unit</label>
          <input
            type="text"
            name="current_reading"
            value={editedReading.unit?.unit_name ?? 'N/A'}
            onChange={handleInputChange}
            className="form-control  border-dark"
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Current Reading</label>
          <input
            type="text"
            name="current_reading"
            value={editedReading.current_reading}
            onChange={handleInputChange}
            className="form-control  border-dark"
          />
        </div>
        <div className="form-group">
          <label>Reading Date</label>
          <input
            type="date"
            name="reading_date"
            value={editedReading.reading_date}
            onChange={handleInputChange}
            className="form-control  border-dark"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReadingModal;
