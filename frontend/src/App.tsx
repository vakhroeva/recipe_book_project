// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IndexRecipe from './pages/Recipe/IndexRecipe';
import IndexRecipeFromUser from './pages/Recipe/IndexRecipeFromUser';
import IndexRecipeWithCategory from './pages/Recipe/IndexRecipeWithCategory';
import ShowRecipe from './pages/Recipe/ShowRecipe';
import CreateRecipe from './pages/Recipe/CreateRecipe';
import EditRecipe from './pages/Recipe/EditRecipe';

import Login from './pages/User/Login';
import CreateUser from './pages/User/CreateUser';
import EditUser from './pages/User/EditUser';

import Header from 'components/Header';

const App: React.FC = () => {

  return (
    <Router>
      <Header />
      <Routes>

        <Route path="/" element={<IndexRecipe />} />
        <Route path="/recipe/user/:id" element={<IndexRecipeFromUser />} />
        <Route path="/category/:categoryName" element={<IndexRecipeWithCategory />} />
        <Route path="/recipe/:id" element={<ShowRecipe />} />
        <Route path="/recipe/create" element={<CreateRecipe />} />
        <Route path="/recipe/edit/:id" element={<EditRecipe />} />

        <Route path="user/login" element={<Login />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/edit/:id" element={<EditUser />} />

      </Routes>
    </Router>
  );
};

export default App;
