import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import PretendardSemiBold from 'assets/fonts/Pretendard-SemiBold.woff2';
import PretendardRegular from 'assets/fonts/Pretendard-Regular.woff2';
export const GlobalStyle = createGlobalStyle`
  ${normalize}
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('PretendardSemiBold'), url(${PretendardSemiBold}) format('woff2');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('PretendardRegular'), url(${PretendardRegular}) format('woff2');
  }
  html {
    font-size:10px;
    box-sizing: border-box;
  }
  body {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin: 0px;
    background-color: #24a78b;
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
