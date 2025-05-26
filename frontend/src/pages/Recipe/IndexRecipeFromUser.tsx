import React, { useEffect, useState } from 'react';
import AddRecipeButton from "../../components/AddRecipeButton"
import {RecipeType} from '../../types/recipe';
import Recipe from 'components/Recipe';

const IndexRecipeFromUser: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/recipes/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке рецептов');
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container d-flex flex-column">
      <div className="d-flex flex-row justify-content-between my-3">
        <h2>Мои рецепты</h2>
        <AddRecipeButton/>
      </div>
      
      {recipes.length === 0 && <p>Рецептов пока нет</p>}
      <div className="row d-flex flex-row">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} data={recipe} />
        ))}
        
      </div>
    </div>
  );
};

export default IndexRecipeFromUser;
