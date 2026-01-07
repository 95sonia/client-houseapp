import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './context/AuthProvider';
import { PublicProvider } from './context/PublicContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <PublicProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PublicProvider>
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>
)
