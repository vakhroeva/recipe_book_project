// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

const Header: React.FC = () => {
  const { userId } = useAuth();

  return (

    <header className="p-3 text-bg-dark">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"> 
                <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"> 
                    <Link to="/" className="btn btn-sm btn-outline-info rounded me-2">Все рецепты</Link>
                    <Link to="/category/Завтраки" className="btn btn-sm btn-outline-info rounded me-2">Завтраки</Link>
                    <Link to="/category/Обеды" className="btn btn-sm btn-outline-info rounded me-2">Обеды</Link>
                    <Link to="/category/Ужины" className="btn btn-sm btn-outline-info rounded me-2">Ужины</Link>
                    <Link to="/category/Десерты" className="btn btn-sm btn-outline-info rounded me-2">Десерты</Link>
                </div>

                <div className="text-end">
                    {userId ? (
                    <>
                        <Link to={`/recipe/user/${Number(userId)}`} className="btn btn-sm btn-outline-info rounded me-2">Мои рецепты</Link>
                        <Link to={`/user/edit/${Number(userId)}`} className="btn btn-sm btn-outline-info rounded me-2">Мой профиль</Link>
                        <LogoutButton />
                    </>
                    ) : (
                    <>
                        <Link to="/user/login" className="btn btn-sm btn-outline-light me-2">Login</Link>
                        <Link to="/user/create" className="btn btn-sm btn-warning">Sign-up</Link>
                    </>
                    )}
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;
