import React, { useState, useEffect } from 'react';
import './AdminCMS.css';
import { FaLock, FaUpload, FaTimes, FaImages, FaPlus, FaTrash } from 'react-icons/fa';

function AdminCMS({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  
  const [activeTab, setActiveTab] = useState('resume');
  const [resumeFile, setResumeFile] = useState(null);
  
  // Gallery Form State
  const [galleryFile, setGalleryFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  
  const [galleryItems, setGalleryItems] = useState([]);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Load items once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchGalleryItems();
    }
  }, [isAuthenticated]);

  // Set timeout to clear status message
  useEffect(() => {
    if (statusMsg.text) {
      const timer = setTimeout(() => {
        setStatusMsg({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

  const fetchGalleryItems = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/gallery`);
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch gallery items:', err);
    }
  };

  const handleVerifyPasscode = async (e) => {
    e.preventDefault();
    setPasscodeError('');
    try {
      const res = await fetch(`${apiUrl}/api/admin/verify-passcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setPasscodeError(data.message || 'Incorrect passcode. Try again.');
      }
    } catch (err) {
      setPasscodeError('Cannot connect to backend server. Make sure it is running.');
    }
  };

  const handleUploadResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      showStatus('Please select a PDF file first.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('passcode', passcode);

    try {
      const res = await fetch(`${apiUrl}/api/admin/upload-resume`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('Resume PDF updated successfully!', 'success');
        setResumeFile(null);
      } else {
        showStatus(data.message || 'Failed to upload resume.', 'error');
      }
    } catch (err) {
      showStatus('Server connection error.', 'error');
    }
  };

  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    const finalCategory = isCustomCategory ? customCategory : category;

    if (!galleryFile) {
      showStatus('Please select an image file.', 'error');
      return;
    }
    if (!title.trim()) {
      showStatus('Please enter an image title.', 'error');
      return;
    }
    if (!finalCategory.trim()) {
      showStatus('Please select or specify a category.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', galleryFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', finalCategory);
    formData.append('passcode', passcode);

    try {
      const res = await fetch(`${apiUrl}/api/admin/add-gallery-item`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('New memory added to gallery!', 'success');
        // Reset form fields
        setGalleryFile(null);
        setTitle('');
        setDescription('');
        setCategory('');
        setCustomCategory('');
        setIsCustomCategory(false);
        // Refresh list
        fetchGalleryItems();
      } else {
        showStatus(data.message || 'Failed to add gallery item.', 'error');
      }
    } catch (err) {
      showStatus('Server connection error.', 'error');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this memory from the gallery?')) return;

    try {
      const res = await fetch(`${apiUrl}/api/admin/gallery-item/${id}?passcode=${passcode}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showStatus('Memory item deleted successfully.', 'success');
        fetchGalleryItems();
      } else {
        showStatus(data.message || 'Failed to delete item.', 'error');
      }
    } catch (err) {
      showStatus('Server connection error.', 'error');
    }
  };

  const showStatus = (text, type) => {
    setStatusMsg({ text, type });
  };

  // Extract unique categories for selection
  const uniqueCategories = [...new Set(galleryItems.map(item => item.category))];

  return (
    <div className="admin-overlay" onClick={onClose}>
      {!isAuthenticated ? (
        <div className="passcode-container" onClick={(e) => e.stopPropagation()}>
          <button className="btn-close-cms" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={onClose}>
            <FaTimes />
          </button>
          <div className="passcode-icon">
            <FaLock />
          </div>
          <h3>Admin Panel Login</h3>
          <p>Please enter your admin passcode to manage files and gallery memories.</p>
          <form onSubmit={handleVerifyPasscode}>
            <div className="passcode-input-group">
              <input
                type="password"
                className="passcode-input"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                required
              />
              <button type="submit" className="btn-verify">Enter</button>
            </div>
            {passcodeError && <div className="passcode-error">{passcodeError}</div>}
          </form>
        </div>
      ) : (
        <div className="cms-container" onClick={(e) => e.stopPropagation()}>
          <div className="cms-header">
            <h2>Portfolio CMS Dashboard</h2>
            <button className="btn-close-cms" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="cms-tabs">
            <button
              className={`cms-tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
              onClick={() => { setActiveTab('resume'); setStatusMsg({ text: '', type: '' }); }}
            >
              Resume Manager
            </button>
            <button
              className={`cms-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => { setActiveTab('gallery'); setStatusMsg({ text: '', type: '' }); }}
            >
              Gallery Manager
            </button>
          </div>

          {statusMsg.text && (
            <div className={`cms-status-msg ${statusMsg.type}`} style={{ marginBottom: '20px' }}>
              {statusMsg.text}
            </div>
          )}

          <div className="cms-content">
            {activeTab === 'resume' ? (
              <div className="cms-section">
                <h3>Update Your Resume PDF</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Upload a PDF version of your CV. This will automatically overwrite the download link on the portfolio.
                </p>
                <form onSubmit={handleUploadResume} className="cms-form">
                  <div className="upload-dropzone">
                    <input
                      type="file"
                      id="resume-file"
                      accept=".pdf"
                      style={{ display: 'none' }}
                      onChange={(e) => setResumeFile(e.target.files[0])}
                    />
                    <label htmlFor="resume-file" style={{ cursor: 'pointer' }}>
                      <div className="dropzone-icon">
                        <FaUpload />
                      </div>
                      <div className="dropzone-text">
                        {resumeFile ? (
                          <span>Selected File: <strong>{resumeFile.name}</strong> ({(resumeFile.size / 1024).toFixed(1)} KB)</span>
                        ) : (
                          <span><strong>Click to choose</strong> or drag PDF here.</span>
                        )}
                      </div>
                    </label>
                  </div>
                  <button type="submit" className="btn-submit-item">
                    Upload Resume PDF
                  </button>
                </form>
              </div>
            ) : (
              <div className="cms-section">
                <h3>Memories Gallery Manager</h3>
                
                {/* Form to Add Item */}
                <form onSubmit={handleAddGalleryItem} className="cms-form">
                  <h4>Add New Memory Card</h4>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Hackathon Winner"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      {!isCustomCategory ? (
                        <div className="category-input-wrapper">
                          <select
                            value={category}
                            onChange={(e) => {
                              if (e.target.value === 'NEW') {
                                setIsCustomCategory(true);
                              } else {
                                setCategory(e.target.value);
                              }
                            }}
                            required
                          >
                            <option value="">-- Select Category --</option>
                            {uniqueCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="NEW">+ Add New Category</option>
                          </select>
                        </div>
                      ) : (
                        <div className="category-input-wrapper">
                          <input
                            type="text"
                            placeholder="Enter new category name"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="btn-verify"
                            style={{ padding: '5px 12px', fontSize: '0.85rem' }}
                            onClick={() => setIsCustomCategory(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      rows="3"
                      placeholder="Enter a brief caption describing this memory..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Select Image File</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setGalleryFile(e.target.files[0])}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-submit-item">
                    Add Memory to Gallery
                  </button>
                </form>

                {/* List of Existing Items */}
                <div className="items-list-container">
                  <h3>Existing Memories ({galleryItems.length})</h3>
                  {galleryItems.map(item => (
                    <div key={item.id} className="cms-item-card">
                      <div className="cms-item-left">
                        <img
                          src={`${apiUrl}/uploads/${item.image}`}
                          alt={item.title}
                          className="cms-item-thumb"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100';
                          }}
                        />
                        <div className="cms-item-details">
                          <h4>{item.title}</h4>
                          <p>Category: <strong>{item.category}</strong></p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-delete-item"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <FaTrash style={{ marginRight: '6px' }} /> Delete
                      </button>
                    </div>
                  ))}
                  {galleryItems.length === 0 && (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: '20px 0' }}>
                      No memory items in the database. Add your first item above!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCMS;
