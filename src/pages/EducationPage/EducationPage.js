import React, { useState, useEffect } from 'react';
import { fetchYouTubeVideos } from '../../api/youtubeApi';
import './EducationPage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Spinner } from 'react-bootstrap';

const EducationPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const videoList = await fetchYouTubeVideos();
        setVideos(videoList);
      } catch (error) {
        setError('Failed to fetch videos. Please try again later.');
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  const handleShowModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className='container education-container'>
      <h1 className='education-title page-title'>Education Page</h1>
      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : error ? (
        <div className='alert alert-danger'>{error}</div>
      ) : (
        <div className='videos-container'>
          {videos.map((video, index) => (
            <div
              key={video.id.videoId || index}
              className='video-card'
              onClick={() => handleShowModal(video)}>
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className='video-thumbnail'
              />
              <div className='video-info'>
                <h3 className='video-title'>{video.snippet.title}</h3>
                <p className='video-channel'>{video.snippet.channelTitle}</p>
                <p className='video-date'>
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size='xl'
        dialogClassName='custom-modal'>
        <Modal.Header className='border-0 p-0'>
          <Button
            variant='close'
            onClick={handleCloseModal}
            aria-label='Close'
            className='modal-close-button'
          />
        </Modal.Header>
        <Modal.Body className='p-0'>
          {selectedVideo && (
            <div className='video-wrapper'>
              <iframe
                width='100%'
                height='500'
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title={selectedVideo.snippet.title}></iframe>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EducationPage;
