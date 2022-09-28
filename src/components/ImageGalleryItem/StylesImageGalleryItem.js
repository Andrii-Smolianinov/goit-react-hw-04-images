import styled from 'styled-components';

export const ImageGalleryItemLi = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const ImageGalleryImage = styled.img`
  display: block;
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover {
    transform: scale(1.03);
    cursor: zoom-in;

    box-shadow: 0px 0px 59px -17px rgba(255, 107, 1, 1),
      inset 0px 0px 24px -9px rgba(84, 84, 84, 0.5);
  }
`;
