import React, { useState, useEffect } from 'react';

const Videos = () => {
  const [videos, setVideos] = useState([]); // State to store videos
  const [newVideo, setNewVideo] = useState({ title: '', description: '', video: '' }); // State for new video
  const [editingVideo, setEditingVideo] = useState(null); // State for editing a video

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/videos/');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // Create a new video
  const createVideo = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/videos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
      });
      const data = await response.json();
      setVideos([...videos, data]); // Add new video to the list
      setNewVideo({ title: '', description: '', video: '' }); // Reset form
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  // Update a video
  const updateVideo = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/videos/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingVideo),
      });
      const data = await response.json();
      setVideos(videos.map(video => (video.id === id ? data : video))); // Update the video in the list
      setEditingVideo(null); // Reset editing state
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  // Delete a video
  const deleteVideo = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/videos/${id}/`, {
        method: 'DELETE',
      });
      setVideos(videos.filter(video => video.id !== id)); // Remove the video from the list
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <div className='w-2.5 xl md:w-5xl'>
        <h2 className='text-2xl shadow-lg text-end p-5 font-bold text-gray-500 bg-orange-500 cursor-pointer hover:shadow-2xl hover:delay-200 hover:transition hover:duration-300 ease-in-out'>
          Videos
        </h2>
      </div>

      {/* Form to create or edit a video */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">
          {editingVideo ? 'Edit Video' : 'Add New Video'}
        </h3>
        <input
          type="text"
          placeholder="Title"
          value={editingVideo ? editingVideo.title : newVideo.title}
          onChange={(e) =>
            editingVideo
              ? setEditingVideo({ ...editingVideo, title: e.target.value })
              : setNewVideo({ ...newVideo, title: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={editingVideo ? editingVideo.description : newVideo.description}
          onChange={(e) =>
            editingVideo
              ? setEditingVideo({ ...editingVideo, description: e.target.value })
              : setNewVideo({ ...newVideo, description: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Video URL"
          value={editingVideo ? editingVideo.video : newVideo.video}
          onChange={(e) =>
            editingVideo
              ? setEditingVideo({ ...editingVideo, video: e.target.value })
              : setNewVideo({ ...newVideo, video: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={editingVideo ? () => updateVideo(editingVideo.id) : createVideo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingVideo ? 'Update' : 'Create'}
        </button>
        {editingVideo && (
          <button
            onClick={() => setEditingVideo(null)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Display videos */}
      <div className="p-4 grid md:grid-cols-4 grid-cols-1">
        {videos.map((video) => (
          <div key={video.id} className="mb-4 p-4 border border-gray-300 rounded">
            <video
              src={`http://127.0.0.1:8000${video.video}`}
              controls
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-bold">{video.title || 'Untitled'}</h3>
            <p className="text-gray-700">{video.description}</p>
            <div className="mt-2">
              <button
                onClick={() => setEditingVideo(video)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteVideo(video.id)}
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

export default Videos;