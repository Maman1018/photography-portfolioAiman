import { useState, useEffect } from 'react';
import { client } from './client';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.getEntries({ content_type: 'photo' })
      .then((response) => {
        console.log("Raw Contentful Data:", response.items);

        // --- THE NEW "UNPACKING" LOGIC ---
        // We take all entries, look inside their 'image' arrays,
        // and flatten them into one single list of all photos.
        const allPhotos = response.items.flatMap((entry) => {
          // If this entry has no images, return an empty list
          if (!entry.fields.image) return [];

          // Return the array of images
          return entry.fields.image;
        });

        console.log("All Unpacked Photos:", allPhotos);
        setPhotos(allPhotos);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching photos:", error));
  }, []);

  const closeModal = (e) => {
    if (e.target.classList.contains('lightbox')) {
      setSelectedPhoto(null);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Photography Portfolio</h1>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading works...</p>
      ) : (
        <div className="gallery-grid">
          {photos.map((photo) => {
            // Note: Now 'photo' is the actual Image Asset itself,
            // not the Entry wrapper. The path is shorter!
            const imageUrl = photo.fields?.file?.url;

            // Safe Check
            if (!imageUrl) return null;

            return (
              <div
                key={photo.sys.id}
                className="photo-item"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img src={imageUrl} alt={photo.fields.title} />
              </div>
            );
          })}
        </div>
      )}

      {selectedPhoto && (
        <div className="lightbox" onClick={closeModal}>
          <img
            src={selectedPhoto.fields?.file?.url}
            alt={selectedPhoto.fields.title}
          />
        </div>
      )}
    </div>
  );
}

export default App;