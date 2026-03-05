// src/pages/PhotographyPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { client, optimizeImg } from '../contentfulClient';
import './PhotographyPage.css';

const PhotographyPage = () => {
    const location = useLocation();
    const initialCategory = location.state?.filterCategory || 'All';

    const [filter, setFilter] = useState(initialCategory);
    const [selectedImg, setSelectedImg] = useState(null);

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.getEntries({ content_type: 'photo' })
            .then((response) => {
                const fetchedPhotos = response.items.map(item => {
                    const imgData = item.fields.image;
                    const actualImg = Array.isArray(imgData) ? imgData[0] : imgData;

                    return {
                        id: item.sys.id,
                        title: item.fields.title,
                        category: item.fields.category,
                        url: actualImg?.fields?.file?.url
                    };
                }).filter(photo => photo.url);

                setPhotos(fetchedPhotos);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching from Contentful:", error);
                setLoading(false);
            });
    }, []);

    const dynamicCategories = ['All', ...new Set(photos.map(p => p.category).filter(Boolean))];

    const filteredPhotos = filter === 'All'
        ? photos
        : photos.filter(p => p.category === filter);

    const openLightbox = (url) => {
        setSelectedImg(optimizeImg(url, 2000));
        if (typeof window !== 'undefined' && document.body) {
            document.body.style.overflow = 'hidden';
        }
    };

    const closeLightbox = () => {
        setSelectedImg(null);
        if (typeof window !== 'undefined' && document.body) {
            document.body.style.overflow = 'auto';
        }
    };

    if (loading) {
        return <div className="photo-page"><h2 style={{color: '#1a1a1a', textAlign: 'center', marginTop: '20vh'}}>Loading Gallery...</h2></div>;
    }

    return (
        <div className="photo-page">
            {/* FIX 1: Changed photography-page to photo-page */}

            {/* FIX 2: Changed photography-header to photo-header */}
            <header className="photo-header">

                {/* FIX 3: Re-applied your specific photo-logo class for the brand styling */}
                <Link to="/" className="photo-logo">AIMAN IZZAT</Link>

                {/* FIX 4: Changed filter-nav to photo-nav */}
                <nav className="photo-nav">
                    {dynamicCategories.map(cat => (
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

            <div className="masonry-grid">
                {filteredPhotos.map((photo) => (
                    <div
                        key={`${photo.id}-${filter}`}
                        className="masonry-item"
                        onClick={() => openLightbox(photo.url)}
                    >
                        <img
                            src={optimizeImg(photo.url, 800)}
                            alt={photo.title || 'Portfolio photo'}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {selectedImg && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
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