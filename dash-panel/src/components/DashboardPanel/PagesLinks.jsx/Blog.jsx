import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', description: '' });
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/blog/');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const createBlog = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/blog/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      const data = await response.json();
      setBlogs([...blogs, data]);
      setNewBlog({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const updateBlog = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/blog/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      });
      const data = await response.json();
      setBlogs(blogs.map((blog) => (blog.id === id ? data : blog)));
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/blog/${id}/`, { method: 'DELETE' });
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className='w-2.5 xl md:w-5xl'>
        <h2 className='text-2xl shadow-lg text-end p-5 font-bold text-gray-500 bg-orange-500 cursor-pointer hover:shadow-2xl hover:delay-200 hover:transition hover:duration-300 ease-in-out'>
          Blog
        </h2>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-4 text-gray-600">
          {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h3>
        <input
          type="text"
          placeholder="Title"
          value={editingBlog ? editingBlog.title : newBlog.title}
          onChange={(e) =>
            editingBlog
              ? setEditingBlog({ ...editingBlog, title: e.target.value })
              : setNewBlog({ ...newBlog, title: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={editingBlog ? editingBlog.description : newBlog.description}
          onChange={(e) =>
            editingBlog
              ? setEditingBlog({ ...editingBlog, description: e.target.value })
              : setNewBlog({ ...newBlog, description: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className='flex flex-row'>
        <button
          onClick={editingBlog ? () => updateBlog(editingBlog.id) : createBlog}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 cursor-pointer"
        >
          {editingBlog ? <AiOutlineEdit size={20} /> : <AiOutlinePlus size={20} />}
          {editingBlog ? 'Update' : 'Create'}
        </button>
        {editingBlog && (
          <button
            onClick={() => setEditingBlog(null)}
            className="ml-2 gap-2 bg-red-500 text-white px-4 py-2 rounded flex items-center  hover:bg-red-600 cursor-pointer"
          >
            <IoMdClose size={20} /> Cancel
          </button>
        )}
        </div>
      </div>

      <div className="p-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="mb-4 p-4 border border-gray-300 rounded flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
              <p className="text-gray-500">{blog.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingBlog(blog)}
                className="bg-orange-500 text-white p-2 rounded hover:bg-yellow-600 cursor-pointer"
              >
                <AiOutlineEdit size={20} />
              </button>
              <button
                onClick={() => deleteBlog(blog.id)}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-500 cursor-pointer"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
