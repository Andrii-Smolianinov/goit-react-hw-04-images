import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar/Searchbar';
import { searchImages } from 'components/API/API';
import { Loader } from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import GalleryModal from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export default function GallerySearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalPages, setTotalPages] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const getImages = async (searchQuery, page) => {
      setIsLoading(true);

      try {
        const data = await searchImages(searchQuery, page);
        
        setItems(prevState => [...prevState, ...data.hits]);
        setTotalPages(data.totalHits);
      } catch (error) {
        setIsError({ error });
      } finally {
        setIsLoading(false);
      }
    };
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const onCleanSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setItems([]);
    setTotalPages(0);
  };

  const handleOpenModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
  };

  const handleBtnLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const isPosts = Boolean(items.length);

  return (
    <>
      {largeImageURL && (
        <GalleryModal
          onClose={handleCloseModal}
          largeImageURL={largeImageURL}
        />
      )}
      <Searchbar onSubmit={onCleanSearch} />
      {isLoading && <Loader />}
      {isError && toast.error('🥴🥴🥴 Error!', { theme: 'colored' })}
      {isPosts && <ImageGallery items={items} onClick={handleOpenModal} />}
      {page < Math.ceil(totalPages / 15) && (
        <Button loadMore={handleBtnLoadMore} />
      )}
      <ToastContainer position="top-right" autoClose={2000} pauseOnHover />
    </>
  );
}
