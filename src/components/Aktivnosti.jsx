import React, { useState, useEffect } from 'react';
import '../styles/Aktivnosti.css';

function Aktivnosti() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [general, setGeneral] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch data from the backend
    // These are placeholders. Replace with actual API calls.
    const fetchedEvents = [
      { id: 1, name: 'Event 1', description: 'Description 1', date: '2023-10-01' },
      { id: 2, name: 'Event 2', description: 'Description 2', date: '2023-10-05' },
    ];
    const fetchedTasks = [
      { id: 1, name: 'Task 1', description: 'Description 1', date: '2023-10-02' },
      { id: 2, name: 'Task 2', description: 'Description 2', date: '2023-10-06' },
    ];
    const fetchedGeneral = [
      { id: 1, name: 'General 1', description: 'Description 1', date: '2023-10-03' },
      { id: 2, name: 'General 2', description: 'Description 2', date: '2023-10-07' },
    ];

    setEvents(fetchedEvents);
    setTasks(fetchedTasks);
    setGeneral(fetchedGeneral);
  }, []);

  const handleSelectActivity = (activityId, category) => {
    if (selectedActivityId === activityId && selectedCategory === category) {
      setSelectedActivityId(null);
      setSelectedCategory('');
    } else {
      setSelectedActivityId(activityId);
      setSelectedCategory(category);
    }
  };

  const handleEditActivity = (event) => {
    event.preventDefault();
    // Add logic to edit activity details
    console.log('Editing activity:', selectedCategory, selectedActivityId);
  };

  const handleDeleteActivity = () => {
    // Add logic to delete activity
    console.log('Deleting activity:', selectedCategory, selectedActivityId);
    if (selectedCategory === 'events') {
      setEvents(events.filter(e => e.id !== selectedActivityId));
    } else if (selectedCategory === 'tasks') {
      setTasks(tasks.filter(t => t.id !== selectedActivityId));
    } else if (selectedCategory === 'general') {
      setGeneral(general.filter(g => g.id !== selectedActivityId));
    }
    setSelectedActivityId(null);
    setSelectedCategory('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (selectedCategory === 'events') {
      setEvents(events.map(e => (e.id === selectedActivityId ? { ...e, [name]: value } : e)));
    } else if (selectedCategory === 'tasks') {
      setTasks(tasks.map(t => (t.id === selectedActivityId ? { ...t, [name]: value } : t)));
    } else if (selectedCategory === 'general') {
      setGeneral(general.map(g => (g.id === selectedActivityId ? { ...g, [name]: value } : g)));
    }
  };

  const selectedActivity = (selectedCategory === 'events' ? events :
                           selectedCategory === 'tasks' ? tasks :
                           general).find(a => a.id === selectedActivityId);

  return (
    <div className="aktivnosti">
      <h2>Aktivnosti</h2>

      <h3>Dogotki</h3>
      <div className="activity-list">
        {events.map((event) => (
          <div key={event.id}>
            <div
              className={`activity-item ${selectedActivityId === event.id && selectedCategory === 'events' ? 'selected' : ''}`}
              onClick={() => handleSelectActivity(event.id, 'events')}
            >
              <span>{event.name}</span>
              <span className="activity-date">{event.date}</span>
            </div>
            {selectedActivityId === event.id && selectedCategory === 'events' && (
              <div className="activity-details">
                <h3>Podatki Dogodka</h3>
                <form onSubmit={handleEditActivity}>
                  <div className="form-group">
                    <label htmlFor="name">Ime:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={selectedActivity.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Opis:</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={selectedActivity.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Datum:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={selectedActivity.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Shrani</button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteActivity}>Izbriši</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      <h3>Naloge</h3>
      <div className="activity-list">
        {tasks.map((task) => (
          <div key={task.id}>
            <div
              className={`activity-item ${selectedActivityId === task.id && selectedCategory === 'tasks' ? 'selected' : ''}`}
              onClick={() => handleSelectActivity(task.id, 'tasks')}
            >
              <span>{task.name}</span>
              <span className="activity-date">{task.date}</span>
            </div>
            {selectedActivityId === task.id && selectedCategory === 'tasks' && (
              <div className="activity-details">
                <h3>Podatki Naloge</h3>
                <form onSubmit={handleEditActivity}>
                  <div className="form-group">
                    <label htmlFor="name">Ime:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={selectedActivity.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Opis:</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={selectedActivity.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Datum:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={selectedActivity.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Shrani</button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteActivity}>Izbriši</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      <h3>Splošno</h3>
      <div className="activity-list">
        {general.map((gen) => (
          <div key={gen.id}>
            <div
              className={`activity-item ${selectedActivityId === gen.id && selectedCategory === 'general' ? 'selected' : ''}`}
              onClick={() => handleSelectActivity(gen.id, 'general')}
            >
              <span>{gen.name}</span>
              <span className="activity-date">{gen.date}</span>
            </div>
            {selectedActivityId === gen.id && selectedCategory === 'general' && (
              <div className="activity-details">
                <h3>Podatki Splošno</h3>
                <form onSubmit={handleEditActivity}>
                  <div className="form-group">
                    <label htmlFor="name">Ime:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={selectedActivity.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Opis:</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={selectedActivity.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Datum:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={selectedActivity.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Shrani</button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteActivity}>Izbriši</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aktivnosti;
