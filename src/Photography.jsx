import { useState, useEffect } from 'react';
import { client } from './client';
import { Link } from 'react-router-dom';
import './styles/App.css';

function Photography() {
  // 1. STATE: Keep track of all photos AND the currently selected category
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Travel'); // Default start category

  // 2. DATA: Define your menu items here
  const categories = ['Travel', 'Graduation', 'Sports'];

  /* src/Photography.jsx */

    useEffect(() => {
      client.getEntries({ content_type: 'photo', include: 10 })
        .then((response) => {
          // CHANGE 1: Use flatMap instead of map.
          // This allows one entry (like "Italy") to return an array of multiple photos.
          const formattedPhotos = response.items.flatMap((entry) => {
            const imageList = entry.fields.image;

            // Safety Check: If entry has no images list, return empty array [] to skip it
            if (!imageList || imageList.length === 0) {
               return [];
            }

            // CHANGE 2: Loop through ALL images in this entry's list
            // instead of just grabbing imageList[0].
            return imageList.map((imageAsset, index) => {
                // Safety Check: Ensure this specific asset is resolved (not a draft)
                if (!imageAsset.fields) return null;

                return {
                  // Create a truly unique ID for React keys by combining entry ID and index
                  id: `${entry.sys.id}-${index}`,
                  // Use the current asset in the loop
                  url: imageAsset.fields.file.url,
                  // Use the title specific to that image asset
                  title: imageAsset.fields.title,
                  // Share the category from the parent entry
                  category: entry.fields.category ? entry.fields.category.toLowerCase() : 'uncategorized'
                };
            });
          })
          // Filter out any individual assets that were drafts (nulls)
          .filter(item => item !== null);

          setPhotos(formattedPhotos);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching photos:", error));
    }, []);

  // 4. FILTER: Show photos that match the active category
  const visiblePhotos = photos.filter((photo) => {
    // If you want an 'All' button later, you can add logic here.
    // For now, it matches 'Travel' == 'travel' (ignoring case)
    return photo.category === activeCategory.toLowerCase();
  });

  const closeModal = (e) => {
    if (e.target.classList.contains('lightbox')) {
      setSelectedPhoto(null);
    }
  };

  return (
    <div className="App">
      <header className="portfolio-header">
        <nav>
            <Link to="/" className="back-link">← Home</Link>
        </nav>

        <h1>Photography Portfolio</h1>

        {/* 5. MENU: The Top Right Navigation */}
        <div className="category-menu">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading works...</p>
      ) : (
        <div className="gallery-grid">
          {/* 6. RENDER: Use 'visiblePhotos' instead of 'photos' */}
          {visiblePhotos.length > 0 ? (
            visiblePhotos.map((photo) => (
              <div
                key={photo.id}
                className="photo-item"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img src={photo.url} alt={photo.title} />
              </div>
            ))
          ) : (
             // Optional: Message if category is empty
            <p style={{gridColumn: "1 / -1", textAlign: "center", opacity: 0.5}}>
              No photos found in {activeCategory}.
            </p>
          )}
        </div>
      )}

      {selectedPhoto && (
        <div className="lightbox" onClick={closeModal}>
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
          />
        </div>
      )}
    </div>
  );
}

export default Photography;