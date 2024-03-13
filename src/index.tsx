import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles/GlobalStyle';
import { AppContainer } from 'components/Common/AppContainer';
import { RecoilRoot } from 'recoil';
import 'styles/font.css';
import axios from 'axios';
// import { StompContextProvider } from 'context/StompContent';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <GlobalStyle />
      {/* <StompContextProvider> */}
        <AppContainer>
          <App />
        </AppContainer>
      {/* </StompContextProvider> */}
    </RecoilRoot>
  </BrowserRouter>,
);
