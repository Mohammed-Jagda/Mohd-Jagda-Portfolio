import React, { useState, useEffect } from 'react';
import './Gallery.css';
import galleryData from './galleryData.json';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

function Gallery() {
  const [items, setItems] = useState(galleryData);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState({ isOpen: false, currentIndex: 0 });
  const [isBackendActive, setIsBackendActive] = useState(false);

  const getApiUrl = () => {
    if (process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    /^192\.168\./.test(hostname) || 
                    /^10\./.test(hostname) || 
                    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname);
    
    if (isLocal) {
      return `http://${hostname}:5000`;
    }
    return 'http://localhost:5000';
  };

  const apiUrl = getApiUrl();

  // Fetch gallery items from backend, fallback to static if offline
  useEffect(() => {
    const fetchGallery = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      try {
        const response = await fetch(`${apiUrl}/api/gallery`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
          const data = await response.json();
          setItems(data);
          setIsBackendActive(true);
        } else {
          setItems(galleryData);
          setIsBackendActive(false);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn('Backend offline or unreachable. Using static galleryData fallback.', err);
        setItems(galleryData);
        setIsBackendActive(false);
      }
    };
    fetchGallery();
  }, [apiUrl]);

  // Dynamically extract categories
  const categories = ['All', ...new Set(items.map(item => item.category))];

  // Filter items
  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.category === filter);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, items]);

  const openLightbox = (index) => {
    const realIndex = items.findIndex(item => item.id === filteredItems[index].id);
    setLightbox({
      isOpen: true,
      currentIndex: realIndex !== -1 ? realIndex : 0
    });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, currentIndex: 0 });
  };

  const nextImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % items.length
    }));
  };

  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + items.length) % items.length
    }));
  };

  const currentItem = items[lightbox.currentIndex];

  const getImageSrc = (imageName) => {
    if (!imageName) return '';
    if (imageName.startsWith('http') || imageName.startsWith('data:')) {
      return imageName;
    }
    if (isBackendActive) {
      return `${apiUrl}/uploads/${imageName}`;
    }
    return process.env.PUBLIC_URL + '/images/gallery/' + imageName;
  };

  return (
    <section className="gallery-section" id="gallery">
      <h2>Memories Gallery</h2>
      
      {/* Filters */}
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="gallery-grid">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className="gallery-card"
            onClick={() => openLightbox(index)}
          >
            <div className="gallery-img-wrapper">
              <span className="gallery-tag">{item.category}</span>
              <img 
                src={getImageSrc(item.image)} 
                alt={item.title} 
                className="gallery-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'; // Fallback to tech image
                }}
              />
            </div>
            <div className="gallery-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && currentItem && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <FaTimes />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            
            <button className="lightbox-arrow prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            
            <img 
              src={getImageSrc(currentItem.image)} 
              alt={currentItem.title}
              className="lightbox-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'; // Fallback
              }}
            />
            
            <button className="lightbox-arrow next" onClick={nextImage}>
              <FaChevronRight />
            </button>
            
            <div className="lightbox-caption">
              <h3>{currentItem.title}</h3>
              <span className="gallery-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '8px' }}>
                {currentItem.category}
              </span>
              <p>{currentItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
