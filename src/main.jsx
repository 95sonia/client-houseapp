import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { CookiesProvider } from 'react-cookie'
import { UserProvider } from './context/UserProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </CookiesProvider>
  </StrictMode>,
)
