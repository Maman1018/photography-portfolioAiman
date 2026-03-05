// src/data/photos.js

/**
 * 🪄 THE MAGIC RESIZER FUNCTION
 * We wrap your Contentful URLs in this to automatically shrink and convert them!
 * @param {string} baseUrl - Your raw Contentful URL
 * @param {number} width - How many pixels wide you need it
 */
export const optimizeImg = (baseUrl, width) => {
    // ?w=xxx sets the exact width
    // &fm=webp converts it to next-gen WebP format (tiny file size)
    // &q=80 sets quality to 80% (visually identical to 100%, but half the size)
    return `${baseUrl}?w=${width}&fm=webp&q=80`;
};

// ---------------------------------------------------------
// YOUR MASTER PHOTO DATABASE
// Paste your Contentful URLs here and assign their categories!
// ---------------------------------------------------------
export const portfolioPhotos = [
    {
        id: 1,
        category: 'Travel',
        url: 'https://images.ctfassets.net/your-space/img1.jpg', // <-- Replace with your Contentful URL
        alt: 'Budapest street'
    },
    {
        id: 2,
        category: 'Sports',
        url: 'https://images.ctfassets.net/your-space/img2.jpg',
        alt: 'Football match'
    },
    {
        id: 3,
        category: 'Graduation',
        url: 'https://images.ctfassets.net/your-space/img3.jpg',
        alt: 'Graduation portrait'
    },
    // Add all 50 photos here!
];

// ---------------------------------------------------------
// HERO & DOME SPECIFIC IMAGES
// (We separate these so your Hero component is easy to manage)
// ---------------------------------------------------------
export const heroImages = {
    mainHero: 'https://images.ctfassets.net/your-space/hero.jpg',
    leftTop: 'https://images.ctfassets.net/your-space/leftTop.jpg',
    leftBottom: 'https://images.ctfassets.net/your-space/leftBot.jpg',
    rightTop: 'https://images.ctfassets.net/your-space/rightTop.jpg',
    rightBottom: 'https://images.ctfassets.net/your-space/rightBot.jpg',
};