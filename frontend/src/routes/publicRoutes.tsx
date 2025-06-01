
import React from 'react';
import { RouteConfig } from '../types/route';

import IndexRecipe from '../pages/Recipe/IndexRecipe';
import IndexRecipeWithCategory from '../pages/Recipe/IndexRecipeWithCategory';
import ShowRecipe from '../pages/Recipe/ShowRecipe';

import Login from '../pages/User/Login';
import CreateUser from '../pages/User/CreateUser';

export const publicRoutes: RouteConfig[] = [
  { path: '/', element: <IndexRecipe /> },
  { path: '/category/:categoryName', element: <IndexRecipeWithCategory /> },
  { path: '/recipe/:id', element: <ShowRecipe /> },

  { path: '/user/login', element: <Login /> },
  { path: '/user/create', element: <CreateUser /> },
];