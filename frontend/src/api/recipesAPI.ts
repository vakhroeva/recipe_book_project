const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = async (token: string) => {
  const response = await fetch(`${API_URL}/api/categories/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при получении категорий');
  }

  const data = await response.json();
  return data.data;
};

export const createRecipe = async (formData: FormData, token: string) => {
  const response = await fetch(`${API_URL}/api/recipes/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при создании рецепта');
  }

  const data = await response.json();
  return data.data;
};

export const createIngredients = async (ingredients: any[], token: string) => {
  const response = await fetch(`${API_URL}/api/ingredients/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredients),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при сохранении ингредиентов');
  }

  return await response.json();
};

export const createSteps = async (steps: any[], token: string) => {
  const response = await fetch(`${API_URL}/api/steps/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(steps),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при сохранении шагов');
  }

  return await response.json();
};

export const getRecipeById = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/api/recipes/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при получении рецепта');
  }

  return await response.json();
};

export const updateRecipe = async (
  id: string,
  formData: FormData,
  token: string
) => {
  const response = await fetch(`${API_URL}/api/recipes/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при обновлении рецепта');
  }

  const data = await response.json();
  return data.data;
};
