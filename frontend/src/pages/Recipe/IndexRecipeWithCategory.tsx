import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { RecipeType } from 'types/recipe';
import Recipe from 'components/Recipe';
    

const IndexRecipeWithCategory: React.FC = () => {
    const { categoryName } = useParams();
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/recipes?category=${categoryName}`)
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
      }, [categoryName]);
    
      if (loading) return <p>Загрузка...</p>;
      if (error) return <p>Ошибка: {error}</p>;

    return(
        <div className="container d-flex flex-column">
          <h2 className="my-3">{categoryName}</h2>
          {recipes.length === 0 && <p>Рецептов пока нет</p>}
          <ul className="row d-flex flex-row">
            {recipes.map((recipe) => (
              <Recipe key={recipe.id} data={recipe}/>
            ))}
          </ul>
        </div>
    )
};

export default IndexRecipeWithCategory;
