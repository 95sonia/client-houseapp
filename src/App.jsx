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
        <Toaster position="top-right" reverseOrder={false} />
      </div>

    </>
  )
}

export default App
