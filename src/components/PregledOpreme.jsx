import React, { useState, useEffect, useContext } from 'react';
import EquipmentModal from './EquipmentModal';
import '../styles/PregledOpreme.css';
import { AuthContext } from '../contexts/AuthContext';

function PregledOpreme() {
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (user && user.pgdId) {
      fetch(`http://localhost:8081/vehicles/${user.pgdId}`)
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            setVehicles(data.data);
          }
        })
        .catch(err => console.error('Failed to fetch vehicle data:', err));
    }
  }, [user]);

  const handleOpenModal = (vehicleId) => {
    if (user && user.pgdId) {
      fetch(`http://localhost:8081/equipment/${vehicleId}/${user.pgdId}`)
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            setSelectedEquipment(data.data);
            setSelectedCategory(vehicleId);
            setModalIsOpen(true);
          }
        })
        .catch(err => console.error('Failed to fetch equipment data:', err));
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteEquipment = (index) => {
    const updatedEquipment = selectedEquipment.filter((_, i) => i !== index);
    setSelectedEquipment(updatedEquipment);
    // Add logic to delete equipment from the database
  };

  const handleEditEquipment = (editedEquipment) => {
    setSelectedEquipment(editedEquipment);
    // Add logic to update equipment in the database
  };

  return (
    <div className="pregled-opreme">
      <h2>Operativna Oprema</h2>
      <div className="equipment-grid">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => handleOpenModal(vehicle.id)}
            className={`equipment-item ${selectedCategory === vehicle.id ? 'active' : ''}`}
          >
            {vehicle.ime}
          </button>
        ))}
      </div>
      <EquipmentModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        equipment={selectedEquipment}
        category={selectedCategory}
        onDelete={handleDeleteEquipment}
        onEdit={handleEditEquipment}
      />
    </div>
  );
}

export default PregledOpreme;
