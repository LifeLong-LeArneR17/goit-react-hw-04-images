import React from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import "./ImageGallery.css"
export const ImageGallery = ({ photos, openModal}) => {
    return (
        <ul  className="ImageGallery">
            {photos?.map((photo, id) => (
                <ImageGalleryItem key={id} photo={photo} openModal={openModal} />
            ))}
        </ul>
    );
};
