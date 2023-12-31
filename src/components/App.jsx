import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchImages } from '../Api/api';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [moreImagesAvailable, setMoreImagesAvailable] = useState(true);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    if (page === 1) {
      setImages([]);
    }

    setLoading(true);

    fetchImages(searchQuery, page)
      .then((data) => {
        if (data.hits.length === 0) {
          setHasMoreImages(false);
        } else {
          setImages((prevImages) => [...prevImages, ...data.hits]);
          if (data.hits.length < 12) {
            setHasMoreImages(false);
            setMoreImagesAvailable(false);
          }
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const handleSearchFormSubmit = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setHasMoreImages(true);
    setMoreImagesAvailable(true);
  };

  const handleImageClick = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
  };

  const handleLoadMoreClick = () => {
    if (moreImagesAvailable) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      {largeImageURL && (
        <Modal image={largeImageURL} onClose={handleCloseModal} />
      )}
      {hasMoreImages && images.length > 0 && (
        <button
          type="button"
          className="button"
          onClick={handleLoadMoreClick}
        >
          Load more
        </button>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default App;