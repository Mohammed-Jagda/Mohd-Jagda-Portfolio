import React, { useState, useEffect } from 'react';
import './Gallery.css';
import galleryData from './galleryData.json';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState({ isOpen: false, currentIndex: 0 });

  // Dynamically extract categories
  const categories = ['All', ...new Set(galleryData.map(item => item.category))];

  // Filter items
  const filteredItems = filter === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

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
  }, [lightbox]);

  const openLightbox = (index) => {
    // Find index of the item in the filtered list
    const realIndex = galleryData.findIndex(item => item.id === filteredItems[index].id);
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
      currentIndex: (prev.currentIndex + 1) % galleryData.length
    }));
  };

  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + galleryData.length) % galleryData.length
    }));
  };

  const currentItem = galleryData[lightbox.currentIndex];

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
                src={process.env.PUBLIC_URL + '/images/gallery/' + item.image} 
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
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes />
            </button>
            
            <button className="lightbox-arrow prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            
            <img 
              src={process.env.PUBLIC_URL + '/images/gallery/' + currentItem.image} 
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
