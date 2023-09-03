// import './App.css';
// import React from 'react';
// import { Component } from 'react';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { photoDataFetch } from 'components/services/images';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
// export class App extends Component {
//   state = {
//     query: '',
//     imageAlt: '',
//     imageSrc: '',
//     page: 1,
//     photos: null,
//     status: 'idle',
//     shownModal: false,
//   };

//   handleInputQuery = name => {
//     this.setState({ query: name });
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { query } = this.state;
//     try {
//       if (prevState.query !== query) {
//         this.setState({ status: "loading"});
//         const result = await photoDataFetch(query);
//         this.setState({ photos: result, status: "idle" });
//         this.setState({page: 1})
//       }
//     } catch (error) {
//       this.setState({ error: error.message, status: "rejected" });
//     }
//   }

//   onChangePage = async () => {
//     const { query, page } = this.state;
//     try {
//       const nextPage = page + 1;
//       const result = await photoDataFetch(query, nextPage);
//       if (result.length > 0) {
//         this.setState({ status: "loading"});
//         const updatedPhotos = [...this.state.photos, ...result];
//         this.setState({ photos: updatedPhotos, page: nextPage, status: "idle"});
//       }
//     } catch (error) {
//       this.setState({ error: error.message, status: "rejected" });
//     }
//   };


//   toggleModal = (imageSrc, imageAlt) => {
//     this.setState(prevState => ({
//       shownModal: !prevState.shownModal,
//       imageSrc,
//       imageAlt,
//     }));
//   };
  

//   onEscapePress = (event ) => {
//     if (event.code === "Escape")  {
//       this.toggleModal(" ", " ")
//     }
//   }

//   componentDidMount() {
//     window.addEventListener("keydown", this.onEscapePress)
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.onEscapePress);
//   }

//   render() {
//     const { photos, page, status, shownModal, imageSrc, imageAlt } = this.state;

//     return (
//       <div className="App">
//         <Searchbar
//           handleInputQuery={this.handleInputQuery}
//         />
//         {status === 'loading' ? (
//           <Loader />
//         ) : (
//           <>
//             <ImageGallery photos={photos}  openModal={this.toggleModal}/>
//             {photos && (
//               <Button
//                 onChangePage={this.onChangePage}
//                 currentPage={page}
//                 totalHits={photos.length / page}
//               />
    
//             )}
//             {shownModal && <Modal openModal = {this.toggleModal} modalImg={imageSrc} imageAlt={imageAlt} />}
//           </>
//         )}
//       </div>
//     );
//   }
// }


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
  const [error, setError] = useState(null);
  const handleInputQuery = name => {
    setQuery(name)
  };

  const prevQueryRef = useRef('');
  useEffect(() => {
    const fetchData =  async () => {
      try {
        if (prevQueryRef.query !== query) {
          setStatus("loading")
          const result = await photoDataFetch(query);
          setPhotos(result);
          setStatus("idle");
          setPage(1);
        }
      } catch (error) {
        setError(error);
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

 const onEscapePress = (event ) => {
    if (event.code === "Escape")  {
      closeModal("", "")
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onEscapePress);
    return () => {
      window.removeEventListener("keydown", onEscapePress);
    }

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

