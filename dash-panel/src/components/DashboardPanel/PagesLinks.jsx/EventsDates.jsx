import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdDelete, MdEdit } from 'react-icons/md';

const EventsDates = () => {
  const [events, setEvents] = useState([]); // State to store events
  const [newEvent, setNewEvent] = useState({ title: '', description: '', event_date: '', image: '' }); // State for new event
  const [editingEvent, setEditingEvent] = useState(null); // State for editing an event

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/events/');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Create a new event
  const createEvent = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
      const data = await response.json();
      setEvents([...events, data]); // Add new event to the list
      setNewEvent({ title: '', description: '', event_date: '', image: '' }); // Reset form
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // Update an event
  const updateEvent = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/events/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingEvent),
      });
      const data = await response.json();
      setEvents(events.map(event => (event.id === id ? data : event))); // Update the event in the list
      setEditingEvent(null); // Reset editing state
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Delete an event
  const deleteEvent = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/events/${id}/`, {
        method: 'DELETE',
      });
      setEvents(events.filter(event => event.id !== id)); // Remove the event from the list
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className='w-2.5 xl md:w-5xl'>
        <h2 className='text-2xl shadow-lg text-end p-5 font-bold text-gray-500 bg-orange-500 cursor-pointer hover:shadow-2xl hover:delay-200 hover:transition hover:duration-300 ease-in-out'>
          Events & Dates
        </h2>
      </div>

      {/* Form to create or edit an event */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </h3>
        <input
          type="text"
          placeholder="Title"
          value={editingEvent ? editingEvent.title : newEvent.title}
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({ ...editingEvent, title: e.target.value })
              : setNewEvent({ ...newEvent, title: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={editingEvent ? editingEvent.description : newEvent.description}
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({ ...editingEvent, description: e.target.value })
              : setNewEvent({ ...newEvent, description: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="date"
          placeholder="Event Date"
          value={editingEvent ? editingEvent.event_date : newEvent.event_date}
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({ ...editingEvent, event_date: e.target.value })
              : setNewEvent({ ...newEvent, event_date: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={editingEvent ? editingEvent.image : newEvent.image}
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({ ...editingEvent, image: e.target.value })
              : setNewEvent({ ...newEvent, image: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className='flex flex-row'>
        <button
          onClick={editingEvent ? () => updateEvent(editingEvent.id) : createEvent}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editingEvent ? 'Update' : 'Create'}
        </button>
        {editingEvent && (
          <button
            onClick={() => setEditingEvent(null)}
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex flex-row"
          >
            <IoMdClose /> Cancel
          </button>
        )}
        </div>
      </div>

      {/* Display events */}
      <div className="p-4">
        {events.map((event) => (
          <div key={event.id} className="mb-4 p-4 border border-gray-300 rounded">
            <img src={`http://127.0.0.1:8000${event.image}`} alt={event.title} className="w-48 h-36 object-cover mb-4 rounded" />
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-500">Event Date: {event.event_date}</p>
            <div className="mt-2">
              <button
                onClick={() => setEditingEvent(event)}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                <MdEdit/>
              </button>
              <button
                onClick={() => deleteEvent(event.id)}
                className="ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                <MdDelete/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsDates;