
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import { publicRoutes } from './routes/publicRoutes';
import { privateRoutes } from './routes/privateRoutes';

import Header from 'components/Header';

const App: React.FC = () => {

  const { authToken } = useAuth();
  const isAuthenticated = !!authToken;

  return (
    <Router>
      <Header />
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route 
            key={path} 
            path={path} 
            element={element} 
          />
        ))}

        {privateRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={isAuthenticated ? element : <Navigate to="/user/login" replace />}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
