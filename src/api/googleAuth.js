import { gapi } from 'gapi-script';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const initClient = () => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [
        'https://sheets.googleapis.com/$discovery/rest?version=v4',
      ],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    });
  });
};

export const handleAuthClick = () => {
  gapi.auth2.getAuthInstance().signIn();
};

export const handleSignOutClick = () => {
  gapi.auth2.getAuthInstance().signOut();
};
