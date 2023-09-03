import './App.css';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { photoDataFetch } from 'components/services/images';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
export function App () {
  const [query, setQuery] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState(null);
  const [status, setStatus] = useState('idle');
  const [shownModal, setShownModal] = useState(false);
  
  const handleInputQuery = name => {
    setQuery(name)
  };

  const prevQueryRef = useRef('');
  useEffect(() => {
    const fetchData =  async () => {
      try {
        if (prevQueryRef.query !== query) {
          setStatus('loading')
          const result = await photoDataFetch(query);
          setPhotos(result);
          setPage(1);
          setStatus('idle');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
    if (query !== '') {
      fetchData();
    }
  }, [query]);

  

  const onChangePage = async () => {
    try {
      const nextPage = page + 1;
      const result = await photoDataFetch(query, nextPage);
      if (result.length > 0) {
        setStatus( "loading");
        const updatedPhotos = [...photos, ...result];
        setPhotos(updatedPhotos);
        setPage(nextPage);
        setStatus("idle")
      }
    } catch (error) {
      setStatus(error);
      setStatus("rejected");
    }
  };


  const toggleModal = (imageSrc, imageAlt) => {
    setImageSrc(imageSrc);
    setImageAlt(imageAlt);
    setShownModal(true);
  };
  

  const closeModal = () => {
    setImageSrc('');
    setImageAlt('');
    setShownModal(false);
  };


  
  useEffect(() => {
    const onEscapePress = (event) => {
      if (event.code === "Escape") {
        closeModal();
      }
    };
  
    window.addEventListener("keydown", onEscapePress);
  
    return () => {
      window.removeEventListener("keydown", onEscapePress);
    };
  }, []); 
  
 



    return (
      <div className="App">
        <Searchbar
          handleInputQuery={handleInputQuery}
        />
        {status === 'loading' ? (
          <Loader />
        ) : (
          <>
            <ImageGallery photos={photos}  openModal={toggleModal}/>
            {photos &&  photos.length > 0 && (
              <Button
                onChangePage={onChangePage}
                currentPage={page}
                totalHits={photos.length / page}
              />
    
            )}
            {shownModal && <Modal openModal = {toggleModal} modalImg={imageSrc} imageAlt={imageAlt} closeModal={closeModal} />}
          </>
        )}
      </div>
    );
  }
