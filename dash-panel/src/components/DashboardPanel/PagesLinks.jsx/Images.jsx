import React, { useState, useEffect } from 'react';
import SideNavbar from '../SideNavbar';

const Images = () => {
  const [images, setImages] = useState([]); // State to store images
  const [newImage, setNewImage] = useState({ title: '', description: '', image: '' }); // State for new image
  const [editingImage, setEditingImage] = useState(null); // State for editing an image

  // Fetch all images
  const fetchImages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/gallery/');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Create a new image
  const createImage = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/gallery/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newImage),
      });
      const data = await response.json();
      setImages([...images, data]); // Add new image to the list
      setNewImage({ title: '', description: '', image: '' }); // Reset form
    } catch (error) {
      console.error('Error creating image:', error);
    }
  };

  // Update an image
  const updateImage = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/gallery/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingImage),
      });
      const data = await response.json();
      setImages(images.map(image => (image.id === id ? data : image))); // Update the image in the list
      setEditingImage(null); // Reset editing state
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  // Delete an image
  const deleteImage = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/gallery/${id}/`, {
        method: 'DELETE',
      });
      setImages(images.filter(image => image.id !== id)); // Remove the image from the list
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <SideNavbar />
      <div className='w-2.5 xl md:w-5xl'>
        <h2 className='text-2xl shadow-lg text-end p-5 font-bold text-gray-500 bg-orange-500 cursor-pointer hover:shadow-2xl hover:delay-200 hover:transition hover:duration-300 ease-in-out'>
          Images
        </h2>
      </div>

      {/* Form to create or edit an image */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">
          {editingImage ? 'Edit Image' : 'Add New Image'}
        </h3>
        <input
          type="text"
          placeholder="Title"
          value={editingImage ? editingImage.title : newImage.title}
          onChange={(e) =>
            editingImage
              ? setEditingImage({ ...editingImage, title: e.target.value })
              : setNewImage({ ...newImage, title: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={editingImage ? editingImage.description : newImage.description}
          onChange={(e) =>
            editingImage
              ? setEditingImage({ ...editingImage, description: e.target.value })
              : setNewImage({ ...newImage, description: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={editingImage ? editingImage.image : newImage.image}
          onChange={(e) =>
            editingImage
              ? setEditingImage({ ...editingImage, image: e.target.value })
              : setNewImage({ ...newImage, image: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={editingImage ? () => updateImage(editingImage.id) : createImage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingImage ? 'Update' : 'Create'}
        </button>
        {editingImage && (
          <button
            onClick={() => setEditingImage(null)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Display images */}
      <div className="p-4">
        {images.map((image) => (
          <div key={image.id} className="mb-4 p-4 border border-gray-300 rounded">
            <img
              src={`http://127.0.0.1:8000${image.image}`}
              alt={image.title || 'Image'}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-bold">{image.title || 'Untitled'}</h3>
            <p className="text-gray-700">{image.description}</p>
            <div className="mt-2">
              <button
                onClick={() => setEditingImage(image)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteImage(image.id)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;