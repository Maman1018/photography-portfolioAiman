// src/components/Genres.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <--- IMPORT THIS
import './Genres.css';

const genresData = [
    {
        id: 1,
        title: 'Travel',
        img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Graduation',
        img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Sports', // <--- FIX: Changed from "Sport" to "Sports" to match your gallery!
        img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop'
    }
];

const Genres = () => {
    return (
        <section className="genres-section" id="photography">
            <div className="genres-container">
                {genresData.map((genre, index) => (
                    /* THE FIX: Changed div to Link and added the "state" prop */
                    <Link
                        to="/photography"
                        state={{ filterCategory: genre.title }}
                        className="genre-card-wrapper"
                        key={genre.id}
                        style={{
                            top: `calc(15vh + ${index * 30}px)`,
                            textDecoration: 'none' /* Prevents underline on the text */
                        }}
                    >
                        <div className="genre-card">
                            <img src={genre.img} alt={genre.title} className="genre-img" />
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