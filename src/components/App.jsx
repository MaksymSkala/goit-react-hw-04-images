import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchImages } from '../Api/api';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [hasMoreImages, setHasMoreImages] = useState(true);

  useEffect(() => {
    if (searchQuery !== '') {
      fetchImages(searchQuery, page)
        .then((data) => {
          if (data.hits.length === 0) {
            setHasMoreImages(false);
          } else {
            setImages((prevImages) => [...prevImages, ...data.hits]);
            setPage((prevPage) => prevPage + 1);
          }
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [searchQuery, page]);

  const handleSearchFormSubmit = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setHasMoreImages(true);
  };

  const handleImageClick = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      {hasMoreImages && images.length > 0 && images.length % 12 === 0 && !loading && (
        <button type="button" className="button" onClick={() => setPage(page + 1)}>
          Load more
        </button>
      )}
      {largeImageURL && <Modal image={largeImageURL} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;