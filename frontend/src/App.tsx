import { useState } from 'react';
import Routes from './routes'

import './global.css';
import { AuthContext, AuthContextData } from './AuthContext';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });


  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
      <ToastContainer />
    </AuthContext.Provider>

  );
}
