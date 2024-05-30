import { createGlobalStyle } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { reset } from 'styled-reset';

//
//
//

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size:10px;
    box-sizing: border-box;
  }
  body {
    display: flex;
    -webkit-box-align: center;
    font-family: 'Pretendard';
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    background-color: ${isMobile ? '#ffffff' : '#24a78b'};
    -ms-overflow-style: none;
    -webkit-tap-highlight-color : rgba(0,0,0,0);
  }
  ::-webkit-scrollbar {
    display: none;
  }
  input {
   border: none;
    outline: none;
  }
  button {
    width: auto;
    background: none;
    border: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  a {
    text-decoration: none;
  }
`;
