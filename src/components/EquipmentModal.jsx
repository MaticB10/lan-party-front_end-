import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import '../styles/EquipmentModal.css';
import { AuthContext } from '../contexts/AuthContext';

Modal.setAppElement('#root');

function EquipmentModal({ isOpen, onRequestClose, equipment, category, onDelete, onEdit }) {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [editedEquipment, setEditedEquipment] = useState([]);

  useEffect(() => {
    console.log('Equipment:', equipment); // Debug statement to log the equipment data
    setEditedEquipment(equipment);
  }, [equipment]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEquipment = [...editedEquipment];
    updatedEquipment[index][name] = value;
    setEditedEquipment(updatedEquipment);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    setEditMode(false);
    try {
      const responses = await Promise.all(editedEquipment.map(item =>
        fetch(`http://localhost:8081/update-equipment/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: item.ime,
            category: item.Kategorija,
            quantity: item.Kolicina,
            purchaseDate: item.DatumNakupa,
            nextInspectionDate: item.Veljavnost,
            id_vozniPark: item.id_vozniPark,
          }),
        })
      ));
      const results = await Promise.all(responses.map(res => res.json()));
      results.forEach(result => {
        if (result.error) {
          console.error('Error updating equipment:', result.message);
        } else {
          console.log('Equipment updated successfully:', result.data);
        }
      });
      onEdit(editedEquipment);
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleDelete = async (index) => {
    const item = editedEquipment[index];
    try {
      const response = await fetch(`http://localhost:8081/delete-equipment/${item.id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (result.error) {
        console.error('Error deleting equipment:', result.message);
      } else {
        console.log('Equipment deleted successfully:', result.data);
        onDelete(index); // Remove from the parent component's state
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const isAdmin = user && (user.rank === 'Admin' || user.rank === 'Super Admin');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Equipment Details"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">
        <h2>Equipment Details</h2>
        <h3>{category}</h3>
      </div>
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Opis</th>
            <th>Količina</th>
            <th>Datum Nakupa</th>
            <th>Naslednji Pregled</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {editedEquipment.map((item, index) => (
            <tr key={item.id}>
              {editMode ? (
                <>
                  <td><input type="text" name="ime" value={item.ime} onChange={(e) => handleChange(e, index)} /></td>
                  <td><input type="text" name="Kategorija" value={item.Kategorija} onChange={(e) => handleChange(e, index)} /></td>
                  <td><input type="number" name="Kolicina" value={item.Kolicina} onChange={(e) => handleChange(e, index)} /></td>
                  <td><input type="date" name="DatumNakupa" value={item.DatumNakupa.split('T')[0]} onChange={(e) => handleChange(e, index)} /></td>
                  <td><input type="date" name="Veljavnost" value={item.Veljavnost.split('T')[0]} onChange={(e) => handleChange(e, index)} /></td>
                </>
              ) : (
                <>
                  <td>{item.ime}</td>
                  <td>{item.Kategorija}</td>
                  <td>{item.Kolicina}</td>
                  <td>{formatDate(item.DatumNakupa)}</td>
                  <td>{formatDate(item.Veljavnost)}</td>
                </>
              )}
                {isAdmin && (
                  <td>
                  <button onClick={() => handleDelete(index)} className="btn btn-danger">Izbriši</button>
                  </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <>
          {editMode ? (
            <button onClick={handleSaveClick} className="btn btn-primary">Shrani</button>
          ) : (
            <button onClick={handleEditClick} className="btn btn-primary">Urejanje</button>
          )}
        </>
      )}
      <button onClick={onRequestClose} className="btn btn-secondary">Close</button>
    </Modal>
  );
}

export default EquipmentModal;
