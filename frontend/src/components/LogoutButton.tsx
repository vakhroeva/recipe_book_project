import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
      Loguot
    </button>
  );
};

export default LogoutButton;
