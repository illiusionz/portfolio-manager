import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../../features/news/newsThunks';
import {
  selectNewsArticles,
  selectNewsLoading,
  selectNewsError,
} from '../../features/news/newsSelectors';
import { selectUserSymbol } from '../../features/user/userSelectors';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap'; // Import Bootstrap components
import './NewsFeed.scss'; // Ensure the styles don't override Bootstrap defaults

const NewsFeed = () => {
  const dispatch = useDispatch();
  const userSymbol = useSelector(selectUserSymbol);
  const articles = useSelector(selectNewsArticles);
  const loading = useSelector(selectNewsLoading);
  const error = useSelector(selectNewsError);

  useEffect(() => {
    if (userSymbol && !articles[userSymbol]) {
      dispatch(fetchNews({ userSymbol }));
    }
  }, [dispatch, userSymbol, articles]);

  if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading news...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant='danger'>Error: {error}</Alert>;
  }

  if (!articles[userSymbol] || articles[userSymbol].length === 0) {
    return <Alert variant='info'>No news available.</Alert>;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>News Feed</Card.Title>
      </Card.Header>
      <div className='news-feed'>
        <Card.Body>
          <Row xs={1} sm={2} md={2} lg={4} xl={4} xxl={6} className='g-4'>
            {articles[userSymbol]?.map((article, index) => (
              <Col key={index}>
                <Card className='h-100 d-flex flex-column'>
                  <div className='text-decoration-none text-dark d-flex flex-column h-100'>
                    <Card.Img
                      variant='top'
                      src={article.image_url}
                      alt={article.title}
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        borderBottom: '1px solid var(--border-color)',
                      }}
                    />
                    <Card.Body className='flex-grow-1 d-flex flex-column'>
                      <Card.Title className='mb-2 text-start card-title'>
                        {article.title}
                      </Card.Title>
                      <small className='text-muted'>
                        {article.publisher.name} -{' '}
                        {new Date(article.published_utc).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </small>
                      <small className='text-muted'></small>

                      {/* <Card.Text className='mb-4 card-text'>
                        {article.description}
                      </Card.Text>*/}
                      <a
                        href={article.article_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn btn-primary'
                        role='button'>
                        Read More
                      </a>
                    </Card.Body>
                    {/* <Card.Footer className='mt-auto d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        <img
                          src={article.publisher.logo_url}
                          alt={article.publisher.name}
                          style={{
                            width: '70px',

                            height: '30px',
                            objectFit: 'contain',
                          }}
                          className='me-2'
                        />
                      </div>
                    </Card.Footer>*/}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </div>
    </Card>
  );
};

export default NewsFeed;
