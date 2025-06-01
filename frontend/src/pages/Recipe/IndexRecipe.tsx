import React, { useEffect, useState } from 'react';
import Recipe from 'components/Recipe';
import {RecipeType} from '../../types/recipe';

const IndexRecipe: React.FC = () => {
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

  const handleRecipeDelete = (id: number) => {
    setRecipes((prev) => prev.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="container d-flex flex-column">
      <h2 className="my-3">Все рецепты </h2>
      {recipes.length === 0 && <p>Рецептов пока нет</p>}
      <ul className="row d-flex flex-row">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} data={recipe} onDelete={handleRecipeDelete}/>
        ))}
        
      </ul>
    </div>
  );
};

export default IndexRecipe;
