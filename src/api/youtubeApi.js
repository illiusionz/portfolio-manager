import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
const MAX_RESULTS = 10;

export const fetchYouTubeVideos = async () => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          channelId: CHANNEL_ID,
          maxResults: MAX_RESULTS,
          key: API_KEY,
        },
      }
    );

    console.log('API Response:', response.data);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
};
