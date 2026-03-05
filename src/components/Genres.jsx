// src/components/Genres.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, optimizeImg } from '../contentfulClient';
import './Genres.css';

const Genres = () => {
    const [genresData, setGenresData] = useState([]);

    useEffect(() => {
        // Fetch all photos (Change 'portfolioPhoto' to your Content Type ID if needed!)
        client.getEntries({ content_type: 'photo' })
            .then(response => {
                const allPhotos = response.items;
                const extractedGenres = [];
                const seenCategories = new Set();

                allPhotos.forEach(item => {
                    const cat = item.fields.category;
                    const imgData = item.fields.image;

                    // 🚨 THE FIX: Open the array
                    const actualImg = Array.isArray(imgData) ? imgData[0] : imgData;
                    const imgUrl = actualImg?.fields?.file?.url;

                    if (cat && imgUrl && !seenCategories.has(cat)) {
                        seenCategories.add(cat);
                        extractedGenres.push({
                            id: item.sys.id,
                            title: cat,
                            // Fetch an optimized 1200px image for the crisp background cover
                            img: optimizeImg(imgUrl, 1200)
                        });
                    }
                });

                setGenresData(extractedGenres);
            })
            .catch(err => console.error("Error fetching genres:", err));
    }, []);

    // While loading, just render an empty section to maintain page layout
    if (genresData.length === 0) {
        return <section className="genres-section" id="photography" style={{ minHeight: '100vh', backgroundColor: '#F4F3F2' }} />;
    }

    return (
        <section className="genres-section" id="photography">
            <div className="genres-container">
                {genresData.map((genre, index) => (
                    <Link
                        to="/photography"
                        state={{ filterCategory: genre.title }}
                        className="genre-card-wrapper"
                        key={genre.id}
                        style={{
                            top: `calc(15vh + ${index * 30}px)`,
                            textDecoration: 'none'
                        }}
                    >
                        <div className="genre-card">
                            <img src={genre.img} alt={genre.title} className="genre-img" loading="lazy" />
                            <div className="genre-overlay">
                                <div className="genre-title-wrapper">
                                    <h2 className="genre-title">{genre.title}</h2>
                                    <span className="genre-explore">Explore Work &rarr;</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Genres;