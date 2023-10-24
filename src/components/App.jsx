import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchImages } from '../Api/api';
import './App.css';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    largeImageURL: '',
    hasMoreImages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page, hasMoreImages } = this.state;

    if (!hasMoreImages) {
      return;
    }

    this.setState({ loading: true });

    fetchImages(searchQuery, page)
      .then((data) => {
        if (data.hits.length === 0) {
          this.setState({ hasMoreImages: false });
        } else {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            page: prevState.page + 1,
          }));
        }
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = (query) => {
    this.setState({ searchQuery: query, page: 1, images: [], hasMoreImages: true });
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { images, loading, largeImageURL, hasMoreImages } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}
        {hasMoreImages && images.length > 0 && images.length % 12 === 0 && !loading && (
          <button type="button" className="button" onClick={this.fetchImages}>
            Load more
          </button>
        )}
        {largeImageURL && (
          <Modal image={largeImageURL} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;