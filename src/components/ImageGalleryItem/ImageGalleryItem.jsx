import React, { Component } from 'react';
import "./ImageGalleryItem.css"
export class ImageGalleryItem extends Component {
    render() {
        const { photo, openModal } = this.props; 
        return (
            <li className="ImageGalleryItem" onClick={() => openModal(photo.largeImageURL , photo.tags)}>
                <img className="ImageGalleryItem-image" src={photo.webformatURL} alt={photo.tags} />
            </li>
        );
    }
}

