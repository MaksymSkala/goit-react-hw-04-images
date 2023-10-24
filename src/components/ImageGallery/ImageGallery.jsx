import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import './ImageGallery.css';
import 'components/index.css';


const ImageGallery = ({ images, onClick }) => (
  <ul className="gallery">
    {images.map((image) => (
      <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
    ))}
  </ul>
);

export default ImageGallery;