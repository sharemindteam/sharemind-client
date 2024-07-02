import { createGlobalStyle } from 'styled-components';
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
    
    -webkit-box-align: center;
    font-family: 'Pretendard';
    align-items: center;
    
    margin: 0;
    padding: 0;
    background-color: #ffffff;
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

  ::selection { 
    background: #c2f3f0; 
  }
`;
