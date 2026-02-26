// src/pages/PhotographyPage.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PhotographyPage.css';

// Placeholder Images - Swap with your real paths!
// Using Unsplash URLs with different aspect ratios to show off the Masonry effect
const photoData = [
    { id: 1, category: 'Travel', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200' },
    { id: 2, category: 'Sports', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800' },
    { id: 3, category: 'Graduation', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000' },
    { id: 4, category: 'Travel', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800' },
    { id: 5, category: 'Sports', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200' },
    { id: 6, category: 'Travel', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=900' },
    { id: 7, category: 'Graduation', img: 'https://images.unsplash.com/photo-1627556592933-ffe99c1c9cd0?q=80&w=1000' },
];

const PhotographyPage = () => {
    const location = useLocation();
    const initialCategory = location.state?.filterCategory || 'All';
    const [filter, setFilter] = useState(initialCategory);

    const [selectedImg, setSelectedImg] = useState(null);

    const categories = ['All', 'Travel', 'Graduation', 'Sports'];

    // Filter Logic
    const filteredPhotos = filter === 'All'
        ? photoData
        : photoData.filter(photo => photo.category === filter);

    // Lightbox handlers
    const openLightbox = (img) => setSelectedImg(img);
    const closeLightbox = () => setSelectedImg(null);

    return (
        <div className="photo-page">
            {/* Header */}
            <header className="photo-header">
                <Link to="/" className="photo-logo">Aiman Izzat</Link>
                <nav className="photo-nav">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={filter === cat ? 'active' : ''}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Masonry Gallery */}
            <div className="masonry-grid">
                {filteredPhotos.map((photo) => (
                    <div
                        key={`${photo.id}-${filter}`} // Forces CSS animation to re-trigger on filter
                        className="masonry-item"
                        onClick={() => openLightbox(photo.img)}
                    >
                        <img src={photo.img} alt={photo.category} loading="lazy" />
                    </div>
                ))}
            </div>

            {/* Fullscreen Lightbox */}
            {selectedImg && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    {/* e.stopPropagation() prevents the click on the image from closing the viewer */}
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeLightbox}>&times;</button>
                        <img src={selectedImg} alt="Expanded view" className="lightbox-img" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotographyPage;