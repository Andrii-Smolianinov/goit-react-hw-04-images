// import React from 'react';
// import { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Searchbar from 'components/Searchbar/Searchbar';
// import ImageGallery from 'components/ImageGallery/ImageGallery';
// import GalleryModal from 'components/Modal/Modal';
// import { searchPosts } from 'components/API/API';
// import { Loader } from 'components/Loader/Loader';
// import { Button } from 'components/Button/Button';

// const GallerySearch = () => {
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState('');
//   const [items, setItems] = useState([]);
//   const [largeImageURL, setLargeImageURL] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     if (!query) {
//       return;
//     }

//     const loadImages = async (query, page) => {
//       setIsLoading(true);

//       try {
//         const data = await searchPosts(query, page);
//         console.log('data', data);

//         setItems(prevState => [...prevState, ...data.hits]);
//         setTotalPages(data.totalHits);
//       } catch (error) {
//         setError({ error });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadImages(query, page);
//   }, [query, page]);

//   const handleSearchSubmit = query => {
//     setQuery(query);
//     setItems([]);
//     setPage(1);
//     setTotalPages(0);
//   };

//   const onLoadMore = () => {
//     setPage(prevState => prevState + 1);
//   };

//   const onOpenModal = largeImageURL => {
//     setLargeImageURL(largeImageURL);
//   };

//   const onCloseModal = () => {
//     setLargeImageURL('');
//   };
//   const isPosts = Boolean(items.length);
//   return (
//     <>
//       {largeImageURL && (
//         <GalleryModal onClose={onCloseModal} largeImageURL={largeImageURL} />
//       )}
//       <Searchbar onSubmit={handleSearchSubmit} />
//       {isLoading && <Loader />}
//       {error && toast.error('🥴🥴🥴 Error!', { theme: 'colored' })}
//       {isPosts && <ImageGallery items={items} onClick={onOpenModal} />}
//       {page < Math.ceil(totalPages / 15) && <Button loadMore={onLoadMore} />}
//       <ToastContainer position="top-right" autoClose={2000} pauseOnHover />
//     </>
//   );
// };

// export default GallerySearch;

import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import { searchPosts } from 'components/API/API';
import { Loader } from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import GalleryModal from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
// import { nanoid } from 'nanoid';

export default class GallerySearch extends Component {
  state = {
    loader: false,
    items: [],
    error: null,
    page: 1,
    searchQuery: '',
    largeImageURL: '',
    totalPages: 0,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (
      (searchQuery && prevState.searchQuery !== searchQuery) ||
      page > prevState.page
    ) {
      this.fetchPosts(searchQuery, page);
    }
  }

  async fetchPosts() {
    const { searchQuery, page } = this.state;
    this.setState({
      loader: true,
    });

    try {
      const data = await searchPosts(searchQuery, page);

      this.setState(({ items }) => {
        return {
          items: [...items, ...data.hits],
          totalPages: data.totalHits,
        };
      });
    } catch (error) {
      this.setState({
        error,
      });
      toast.error('Oops, an error occurred', { theme: 'colored' });
    } finally {
      this.setState({
        loader: false,
      });
    }
  }

  onSearch = ({ searchQuery }) => {
    this.setState({
      items: [],
      page: 1,
      searchQuery,
      totalPages: 0,
    });
  };

  openModal = largeImageURL => {
    this.setState({
      largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      largeImageURL: '',
    });
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };
  // itemsId = nanoid();
  render() {
    const { items, loader, error, largeImageURL, totalPages, page } =
      this.state;
    const isPosts = Boolean(items.length);
    const { onSearch, closeModal, openModal, loadMore, toast } = this;
    return (
      <>
        {largeImageURL && (
          <GalleryModal onClose={closeModal} largeImageURL={largeImageURL} />
        )}
        <Searchbar onSubmit={onSearch} />
        {loader && <Loader />}
        {error && toast.error('🥴🥴🥴 Error!', { theme: 'colored' })}
        {isPosts && <ImageGallery items={items} onClick={openModal} />}
        {page < Math.ceil(totalPages / 15) && <Button loadMore={loadMore} />}
        <ToastContainer position="top-right" autoClose={2000} pauseOnHover />
      </>
    );
  }
}