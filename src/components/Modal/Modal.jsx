import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={image} alt="Large" />
        </div>
      </div>
    );
  }
}

export default Modal;