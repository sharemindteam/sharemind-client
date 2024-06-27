import styled from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';

export const BackDrop = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }

  position: fixed;
  top: 0;

  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
