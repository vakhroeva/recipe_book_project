import React, { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthContext';
import {getCategories, createRecipe, createIngredients, createSteps} from '../../api/recipesAPI'

import AutoGrowTextarea from '../../components/AutoGrowTextarea';
    
const CreateRecipe: React.FC = () => {
  const {userId, authToken} = useAuth();

  const [categoryData, setCategoryData] = useState<{ id: number; name: string }[]>([]);

  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    category_id: ''
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [steps, setSteps] = useState([
    { step_number: 1, instruction: '' }
  ]);

  const [ingredients, setIngredients] = useState([
    { name: '', amount: '' }
  ]);

  const [error, setError] = useState<string | null>(null);
  const [messAboutIngredients, setMessAboutIngredients] = useState<string | null>(null);
  const [messAboutSteps, setMessAboutSteps] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  type IngredientField = 'name' | 'amount';
  type StepField = 'instruction';

  useEffect(() => {

    const loadCategories = async () => {
      try {

        if (!authToken) {
          setError("Отсутствует токен авторизации");
          return;
        }

        const data = await getCategories(authToken);
        setCategoryData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadCategories();
  }, [authToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const addIngredient = () => {
    const allFilled = ingredients.every(
      (ing) => ing.name.trim() !== '' && ing.amount.trim() !== ''
    );

    if (!allFilled) {
      setMessAboutIngredients('Сначала заполните имеющиеся ингредиенты.');
      return;
    }

    setMessAboutIngredients('');
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  const addStep = () => {
    const allFilled = steps.every(
      (step) => step.instruction.trim() !== ''
    );

    if (!allFilled) {
      setMessAboutSteps('Сначала заполните имеющиеся шаги.');
      return;
    }

    setMessAboutSteps('');
    setSteps([...steps, { step_number: steps.length + 1,instruction: '' }]);
  }

  const deleteIngredient = (indexToDelete: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, index) => index !== indexToDelete)
    );
  };

  const deleteStep = (indexToDelete: number) => {
    setSteps((prevSteps) =>
      prevSteps.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleIngredientChange = (index: number, field: IngredientField, value: string) => {
    let newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
    setMessAboutIngredients('');
  };

  const handleStepChange = (index: number, field: StepField, value: string) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
    setMessAboutSteps('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setMessAboutIngredients('');
    setMessAboutSteps('');

    if (ingredients.length === 0 || ingredients.some(i => !i.name.trim() || !i.amount.trim())) {
      setMessAboutIngredients('Ингредиенты не заполнены.');
      return;
    }

    if (steps.length === 0 || steps.some(s => !s.instruction.trim())) {
      setMessAboutSteps('Шаги не заполнены.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('user_id', String(userId));
      formData.append('title', recipeData.title);
      formData.append('description', recipeData.description);
      formData.append('category_id', recipeData.category_id);
      if (photoFile) formData.append('photo', photoFile);

      if (!authToken) {
        setError("Отсутствует токен авторизации");
        return;
      }
      
      const recipe = await createRecipe(formData, authToken);

      const ingredientsWithRecipeId = ingredients.map(i => ({ ...i, recipe_id: recipe.id }));
      await createIngredients(ingredientsWithRecipeId, authToken);

      const stepsWithRecipeId = steps.map(s => ({ ...s, recipe_id: recipe.id }));
      await createSteps(stepsWithRecipeId, authToken);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Ошибка при сохранении рецепта');
    }
  };

  if (!userId || isNaN(Number(userId))) return;
  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="container mt-4 col-12 col-md-6">
      <h2>Создание рецепта</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Данные сохранены!</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Название</label>
          <input type="text" className="form-control" id="title" name="title" required onChange={handleChange} value={recipeData.title ?? ''}/>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Описание</label>

          <AutoGrowTextarea
            className="form-control overflow-y-hidden"
            id="description"
            name="description"
            rows={1}
            onChange={handleChange}
            value={recipeData.description ?? ''}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Фотография</label>

          {photoPreview && (
            <div className="mb-2">
              <img 
                src={photoPreview} 
                alt="Фото блюда" 
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} 
              />
            </div>
          )}

          <input type="file" className="form-control" id="photo" name="photo" accept="image/*" required 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setPhotoFile(e.target.files[0]);
                setPhotoPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}/>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Категория</label>

          <select id="category" name="category_id" className="form-select" value={recipeData.category_id} onChange={handleChange} required>
            <option value="">Выберите категорию</option>
            {categoryData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
          ))}
          </select>
        </div>

        <div>
          <div className='d-flex justify-content-center my-4'>
            <label htmlFor="title" className="form-label h2">Ингредиенты</label>
          </div>

          {ingredients.map((ingredient, index) => (
            <div key={index} className="mb-3 w-100 d-flex justify-content-around ">
              <p className='my-auto'>{index + 1}</p>

              <input
                type="text"
                placeholder="Ингредиент"
                value={ingredient.name}
                className="form-control w-50"
                name={`name_of_ingredient_${index}`}
                id={`name_of_ingredient_${index}`}
                onChange={(e) =>
                  handleIngredientChange(index, 'name', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Количество"
                value={ingredient.amount}
                className="form-control w-25"
                name={`amount_of_ingredient_${index}`}
                id={`amount_of_ingredient_${index}`}
                onChange={(e) =>
                  handleIngredientChange(index, 'amount', e.target.value)
                }
              />
              <button type="button" className="btn btn-danger" onClick={() => deleteIngredient(index)}>
                <i className="fa fa-trash"></i>
              </button>

            </div>
          ))}

          <div className='d-flex justify-content-end align-items-center my-4'>
            {messAboutIngredients && (
              <div className="alert alert-danger mb-0 py-2 px-3 flex-grow-1">
                {messAboutIngredients}
              </div>
            )}

            <button type="button" className="btn btn-primary" onClick={addIngredient}>
              <i className="fa fa-plus"></i> Добавить
            </button>
          </div>
        </div>

        <div>
          <div className='d-flex justify-content-center my-4'>
            <label htmlFor="title" className="form-label h2">Шаги</label>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="mb-3 w-100 d-flex justify-content-around align-items-center">
              <p className='my-auto'>{index + 1}</p>

              <AutoGrowTextarea
                placeholder="Описание действия"
                className="form-control w-50 overflow-y-hidden"
                name={`step_${index}`}
                id={`step_${index}`}
                rows={1}
                value={step.instruction}
                onChange={(e) =>
                  handleStepChange(index, 'instruction', e.target.value)
                }
              />
              
              <button type="button" className="btn btn-danger" onClick={() => deleteStep(index)}>
                <i className="fa fa-trash"></i>
              </button>

            </div>
          ))}
          
          <div className='d-flex justify-content-end align-items-center my-4'>
            {messAboutSteps && (
              <div className="alert alert-danger mb-0 py-2 px-3 flex-grow-1">
                {messAboutSteps}
                </div>
            )}

            <button type="button" className="btn btn-primary" onClick={addStep}>
              <i className="fa fa-plus"></i> Добавить
            </button>
          </div>

        </div>

        <div className="my-4 text-center">
          <button type="submit" className="btn btn-lg btn-success text-light w-50"><i className='fa fa-save'></i> Сохранить</button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;