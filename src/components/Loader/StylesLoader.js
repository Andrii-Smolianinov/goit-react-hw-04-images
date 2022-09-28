import styled from 'styled-components';

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgb(10, 2, 124),
    rgb(13, 46, 233)
  );
  position: fixed;
  top: 0;
  z-index: 100;
  transition: 0.6s;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoaderDiv = styled.div`
  width: 75px;
  height: 75px;
  border: 10px solid rgba(13, 71, 161, 0.6);
  border-radius: 50%;
  border-left: 50%;
  border-left-color: #ffff00;
  animation: loader 0.5s linear infinite;
  @keyframes loader {
    100% {
      transform: rotate(360deg);
    }
  }
`;
