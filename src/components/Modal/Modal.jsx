import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from 'components/Modal/StylesModal';

const modalRoot = document.getElementById('modal-root');

const GalleryModal = ({ largeImageURL, onClose }) => {
  
  useEffect(() => {
    const handleKey = event => (event.code === 'Escape') & onClose();
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  });

  const closeModal = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={closeModal}>
      <Modal>
        <img src={largeImageURL} alt="" />
      </Modal>
    </Overlay>,
    modalRoot
  );
};

export default GalleryModal;

GalleryModal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};
