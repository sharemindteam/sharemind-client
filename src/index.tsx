import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles/GlobalStyle';
import { AppContainer } from 'components/Common/AppContainer';
import { RecoilRoot } from 'recoil';
import 'styles/font.css';
import axios from 'axios';
import { StompProvider } from 'contexts/StompContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <GlobalStyle />
      <StompProvider>
        <QueryClientProvider client={queryClient}>
          <AppContainer>
            <App />
          </AppContainer>
        </QueryClientProvider>
      </StompProvider>
    </RecoilRoot>
  </BrowserRouter>,
);
