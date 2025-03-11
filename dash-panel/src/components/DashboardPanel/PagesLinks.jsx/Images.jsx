import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const GalleryImages = () => {
  const [images, setImages] = useState([]); // State to store images
  const [newImage, setNewImage] = useState({ title: '', description: '', image: null }); // State for new image
  const [editingImage, setEditingImage] = useState(null); // State for editing an image

  // Fetch all images
  const fetchImages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/images/');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Create a new image
  const createImage = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newImage.title);
      formData.append('description', newImage.description);
      if (newImage.image) {
        formData.append('image', newImage.image); // Append the image file
      }

      const response = await fetch('http://127.0.0.1:8000/images/', {
        method: 'POST',
        body: formData, // Send FormData instead of JSON
      });
      const data = await response.json();
      setImages([...images, data]); // Add new image to the list
      setNewImage({ title: '', description: '', image: null }); // Reset form
    } catch (error) {
      console.error('Error creating image:', error);
    }
  };

  // Update an image
  const updateImage = async (id) => {
    try {
      const formData = new FormData();
      formData.append('title', editingImage.title);
      formData.append('description', editingImage.description);
      if (editingImage.image) {
        formData.append('image', editingImage.image); // Append the image file
      }

      const response = await fetch(`http://127.0.0.1:8000/images/${id}/`, {
        method: 'PUT',
        body: formData, // Send FormData instead of JSON
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
      await fetch(`http://127.0.0.1:8000/images/${id}/`, {
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

  // Handle file input change
  const handleImageChange = (e, isEditing) => {
    const file = e.target.files[0];
    if (isEditing) {
      setEditingImage({ ...editingImage, image: file });
    } else {
      setNewImage({ ...newImage, image: file });
    }
  };

  return (
    <div>
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
          type="file"
          onChange={(e) => handleImageChange(e, !!editingImage)} // Handle file input
          className="block w-full p-2 mb-4 border border-gray-300 rounded cursor-pointer"
        />
        <button
          onClick={editingImage ? () => updateImage(editingImage.id) : createImage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          {editingImage ? 'Update' : 'Create'}
        </button>
        {editingImage && (
          <button
            onClick={() => setEditingImage(null)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Display images */}
      <div className="p-4 grid md:grid-cols-5 sm:grid-cols-2">
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
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
              >
                <MdEdit/>
              </button>
              <button
                onClick={() => deleteImage(image.id)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
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

export default GalleryImages;