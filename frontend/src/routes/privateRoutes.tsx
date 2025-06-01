
import React from 'react';
import { RouteConfig } from '../types/route';

import IndexRecipeFromUser from '../pages/Recipe/IndexRecipeFromUser';
import CreateRecipe from '../pages/Recipe/CreateRecipe';
import EditRecipe from '../pages/Recipe/EditRecipe';

import EditUser from '../pages/User/EditUser';

export const privateRoutes: RouteConfig[] = [
  { path: '/recipe/user/:id', element: <IndexRecipeFromUser /> },
  { path: '/recipe/create', element: <CreateRecipe /> },
  { path: '/recipe/edit/:id', element: <EditRecipe /> },

  { path: '/user/edit/:id', element: <EditUser /> },
];