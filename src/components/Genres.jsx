// src/components/Genres.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, optimizeImg } from '../contentfulClient';
import './Genres.css';

const Genres = () => {
    const [genresData, setGenresData] = useState([]);

    useEffect(() => {
        // 🚨 THE FIX: Fetch specifically from the new 'genre' Content Model
        client.getEntries({ content_type: 'genre' })
            .then(response => {
                const fetchedGenres = response.items.map(item => {
                    const title = item.fields.title;
                    const imgData = item.fields.coverImage;

                    // Safely grab the image URL
                    const actualImg = Array.isArray(imgData) ? imgData[0] : imgData;
                    const imgUrl = actualImg?.fields?.file?.url;

                    return {
                        id: item.sys.id,
                        title: title,
                        // Fetch an optimized 1200px image for the crisp background cover
                        img: imgUrl ? optimizeImg(imgUrl, 1200) : null
                    };
                }).filter(g => g.title && g.img); // Only keep valid genres

                setGenresData(fetchedGenres);
            })
            .catch(err => console.error("Error fetching genres:", err));
    }, []);

    // While loading, just render an empty section to maintain page layout
    if (genresData.length === 0) {
        return <section className="genres-section" id="photography" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }} />;
    }

    // 🚨 YOUR UNTOUCHED WORKING RENDER STRUCTURE
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