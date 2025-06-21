import './App.css';
import { AuthProvider } from '../src/context/AuthContext'
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;