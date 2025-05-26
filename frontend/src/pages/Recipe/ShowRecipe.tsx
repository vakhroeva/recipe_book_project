import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Recipe from 'components/Recipe';
import {RecipeType, Ingredient} from '../../types/recipe';
import { categoryColors } from 'constants/categoryColors';
import IngredientLi from '../../components/IngredientLi';
import StepLi from '../../components/StepLi';
    
const ShowRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeType>();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке рецептов');
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (!recipe) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const backgroundTagColor = categoryColors[recipe.category.name] || '#ccc';
  
  return (
    <div className="container d-flex flex-column text-center col-12">

      <p className="my-3 mb-1">
        <span className='h2'>{recipe.title}</span>  
        <span className="rounded fw-bold text-white p-1" style={{ backgroundColor: backgroundTagColor }}>
          <i className="fa fa-star"></i>{recipe.category.name}</span>
      </p>

      <p className="h4 m-0 p-0">Author: {recipe.user.username}</p>

      <div className="row justify-content-center my-4">
        <div className="col-12 col-md-6">
          <img className="w-100" 
            src={`${process.env.REACT_APP_API_URL}${recipe.main_photo_url}`} 
            alt="recipes photo" 
            style={{
              maxWidth: '900px',
              maxHeight: '900px',
              objectFit: 'contain'
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <p className="text-start px-3 py-2">{recipe.description}</p>
          <p className='h5'>Ингредиенты:</p>

          <ul className="p-0 w-100 d-flex flex-column">
            {recipe?.ingredients?.map((ing) => (
              <IngredientLi key={ing.id} data={ing} />
            ))} 
          </ul>
        </div>
      </div>
      
      <p className='h5 py-4'>Шаги:</p>
      <div className='row justify-content-center'>
        {recipe?.steps?.map((step) => (
          <StepLi key={step.id} data={step} />
        ))} 
      </div>

    </div>
  );
}

export default ShowRecipe;