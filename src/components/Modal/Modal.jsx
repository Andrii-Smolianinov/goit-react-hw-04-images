import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from 'components/Modal/StylesModal';

const modalRoot = document.getElementById('modal-root');

export default class GalleryModal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { closeModal } = this;
    return createPortal(
      <Overlay onClick={closeModal}>
        <Modal>
          <img src={this.props.largeImageURL} alt="" />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}
