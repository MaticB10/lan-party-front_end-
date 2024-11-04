import React, { useState, useEffect, useContext } from 'react';
import '../styles/VnosOpreme.css';
import { AuthContext } from '../contexts/AuthContext';

function VnosOpreme() {
  const { user } = useContext(AuthContext);
  const [generalEquipment, setGeneralEquipment] = useState({
    name: '',
    description: '',
    quantity: '',
    purchaseDate: '',
    nextInspectionDate: '',
    owner: '',
    vehicleId: '' // Add vehicleId to the state
  });

  const [vehicles, setVehicles] = useState([]);
  const [isSerialNumberDisabled, setIsSerialNumberDisabled] = useState(false);

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

  const handleGeneralChange = (event) => {
    const { name, value } = event.target;
    setGeneralEquipment({ ...generalEquipment, [name]: value });

    if (name === 'quantity') {
      setIsSerialNumberDisabled(value > 1);
    }
  };

  const handleGeneralSubmit = async (event) => {
    event.preventDefault();

    const equipmentData = {
      name: generalEquipment.name,
      quantity: generalEquipment.quantity,
      purchaseDate: generalEquipment.purchaseDate,
      nextInspectionDate: generalEquipment.nextInspectionDate,
      category: generalEquipment.description, // Assuming description is the category here
      id_vozniPark: generalEquipment.vehicleId // Use the selected vehicleId
    };

    try {
      const response = await fetch('http://localhost:8081/add-equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipmentData),
      });

      const result = await response.json();
      if (result.error) {
        console.error('Error adding equipment:', result.message);
      } else {
        console.log('Equipment added successfully:', result.data);
        setGeneralEquipment({ name: '', description: '', quantity: '', purchaseDate: '', nextInspectionDate: '', owner: '', vehicleId: '' });
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="vnos-opreme">
      <div className="form-section">
        <h2>Vnos Opreme</h2>
        <form onSubmit={handleGeneralSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ime Opreme:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={generalEquipment.name}
              onChange={handleGeneralChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Količina:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={generalEquipment.quantity}
              onChange={handleGeneralChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Seriska Št.:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={generalEquipment.description}
              onChange={handleGeneralChange}
              required
              disabled={isSerialNumberDisabled}
            />
          </div>
          <div className="form-group">
            <label htmlFor="purchaseDate">Datum Nakupa:</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={generalEquipment.purchaseDate}
              onChange={handleGeneralChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nextInspectionDate">Naslednji Pregled:</label>
            <input
              type="date"
              id="nextInspectionDate"
              name="nextInspectionDate"
              value={generalEquipment.nextInspectionDate}
              onChange={handleGeneralChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleId">Vozilo:</label>
            <select
              id="vehicleId"
              name="vehicleId"
              value={generalEquipment.vehicleId}
              onChange={handleGeneralChange}
              required
            >
              <option value="" disabled>Izberi vozilo</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.ime}</option>
              ))}
            </select>
          </div>
          <button type="submit">Shrani</button>
        </form>
      </div>
    </div>
  );
}

export default VnosOpreme;
