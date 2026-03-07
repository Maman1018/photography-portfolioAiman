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

    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        client.getEntries({ content_type: 'photo' })
            .then((response) => {
                // 🚨 THE FIX: Use flatMap to unpack multiple images per entry!
                const fetchedPhotos = response.items.flatMap(item => {
                    const imgData = item.fields.image;

                    // Force it into an array even if there's only 1 image, so we can loop it safely
                    const imagesArray = Array.isArray(imgData) ? imgData : (imgData ? [imgData] : []);

                    // Loop through EVERY image in this entry
                    return imagesArray.map((singleImg, index) => ({
                        // Make a unique ID by combining the entry ID and the image index!
                        id: `${item.sys.id}-${index}`,
                        title: item.fields.title,
                        category: item.fields.category,
                        url: singleImg?.fields?.file?.url
                    }));
                }).filter(photo => photo.url); // Drop any empty ones

                setPhotos(fetchedPhotos);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching from Contentful:", error);
                setLoading(false);
            });
    }, []);

    // NEW: Scroll Listener for Back to Top Button
    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 400 pixels
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
            {/* NEW: Back to Top Button */}
            <button
                className={`photo-back-to-top ${showTopBtn ? 'visible' : ''}`}
                onClick={scrollToTop}
                title="Back to top"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                </svg>
            </button>
        </div>
    );
};

export default PhotographyPage;