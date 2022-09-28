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
