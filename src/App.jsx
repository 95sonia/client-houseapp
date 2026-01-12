import './App.css';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <AppRoutes />
      <Footer />
      <div>
        <Toaster position="top-right" reverseOrder={false}
          toastOptions={{
            style: { // Estilos globales
              padding: '17px 25px',// bocadillo más grande
              maxWidth: '500px',
            },
          }}
        />
      </div>

    </>
  )
}

export default App
