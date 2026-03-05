// src/contentfulClient.js
import { createClient } from 'contentful';

// Initialize the Contentful Client
export const client = createClient({
    space: 'b83dxp2uqthu',       // <-- Replace with your Space ID
    accessToken: 'QdY3EpCgI9TOuaISMOsoNF26MLV7BFhxGalGkt5EHOM', // <-- Replace with your Content Delivery API Token
});

// src/contentfulClient.js
export const optimizeImg = (baseUrl, width) => {
    if (!baseUrl) return null; // FIX: Return null instead of ''
    const safeUrl = baseUrl.startsWith('http') ? baseUrl : `https:${baseUrl}`;
    return `${safeUrl}?w=${width}&fm=webp&q=80`;
};