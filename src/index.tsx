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
import AppLayout from 'App.Layout';

import { clarity } from 'react-microsoft-clarity';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'production') {
  clarity.init(process.env.REACT_APP_CLARITY_ID as string);
}

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <GlobalStyle />
      <StompProvider>
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <AppContainer>
              <App />
            </AppContainer>
          </AppLayout>
        </QueryClientProvider>
      </StompProvider>
    </RecoilRoot>
  </BrowserRouter>,
);

serviceWorkerRegistration.register();
