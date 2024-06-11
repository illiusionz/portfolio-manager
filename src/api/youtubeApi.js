// src/api/youtubeApi.js
import axios from 'axios';

const API_KEY = 'AIzaSyBTkiRMqjzqZLN3rTEtPj4mAtj8uMZMlPQ';
const CHANNEL_ID = 'UC44-XCDTGmDYOX75XL0cpbQ';
const MAX_RESULTS = 10;

export const fetchYouTubeVideos = async () => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          channelId: CHANNEL_ID,
          maxResults: MAX_RESULTS,
          key: API_KEY,
        },
      }
    );

    console.log('API Response:', response.data); // Log the entire response

    return response.data.items; // Use the items directly
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
};
