import { gapi } from 'gapi-script';

export const initClient = () => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'AIzaSyDHyA7Uk98E-1pzdgfhkD2ojPWZ0XrGWhU',
      clientId:
        '390328008011-ljbn3sjcc7rqvva2p7h6hk1b4l03s131.apps.googleusercontent.com',
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
