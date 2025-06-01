import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthProvider from './context/Auth';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
