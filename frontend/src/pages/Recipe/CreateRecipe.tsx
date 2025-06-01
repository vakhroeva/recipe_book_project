import React, { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthContext';
    
  const CreateRecipe: React.FC = () => {
    const {userId, authToken} = useAuth();

    const [categoryData, setCategoryData] = useState<{ id: number; name: string }[]>([]);

    const [recipeData, setRecipeData] = useState({
      title: '',
      description: '',
      category_id: ''
    });

    const [photoFile, setPhotoFile] = useState<File | null>(null);

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
 
      const categoriesData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
              'Accept': 'application/json'
            },
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || 'Ошибка при получении данных');
            return;
          }
          
          const data = await response.json();
          setCategoryData(data.data);
          setLoading(false);
        } catch (err) {
          setError('Ошибка подключения к серверу');
        }
      }

      categoriesData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      const allIngredientsFilled = ingredients.every(
        (ing) => ing.name.trim() !== '' && ing.amount.trim() !== ''
      );

      if ((!allIngredientsFilled) || (ingredients.length === 0)) {
        setMessAboutIngredients('Ингредиенты не заполнены.');
        return;
      }

      const allStepsFilled = steps.every(
        (step) => step.instruction.trim() !== '' && step.step_number != null
      );

      if ((!allStepsFilled) || (steps.length === 0)) {
        setMessAboutSteps('Шаги не заполнены.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('user_id', String(userId));
        formData.append('title', recipeData.title);
        formData.append('description', recipeData.description);
        formData.append('category_id', recipeData.category_id);
        if (photoFile) {
          formData.append('photo', photoFile);
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`, 
          },
          body: formData
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Ошибка при создании рецепта');
          return;
        }
        
        const data = await response.json();

        const ingredientsWithRecipeId = ingredients.map((ing) => ({
          ...ing,
          recipe_id: data.data.id
        }));
  
        const response2 = await fetch(`${process.env.REACT_APP_API_URL}/api/ingredients/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(ingredientsWithRecipeId)
        });
  
        if (!response2.ok) {
          const errorData = await response2.json();
          setError(errorData.message || 'Ошибка при сохранении ингредиентов');
          return;
        }

        const stepsWithRecipeId = steps.map((step) => ({
          ...step,
          recipe_id: data.data.id
        }));
  
        const response3 = await fetch(`${process.env.REACT_APP_API_URL}/api/steps/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(stepsWithRecipeId)
        });
  
        if (!response3.ok) {
          const errorData = await response3.json();
          setError(errorData.message || 'Ошибка при сохранении шагов');
          return;
        }

        setSuccess(true);

      } catch (err) {
        setError(`Ошибка подключения к серверу ${err}`);
      }
    };

    if (!userId || isNaN(Number(userId))) return;
    if (loading) return <p>Загрузка...</p>;

    return (
      <div className="container mt-4 w-50">
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
            <input type="text" className="form-control" id="description" name="description" required onChange={handleChange} value={recipeData.description ?? ''}/>
          </div>

          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Фотография</label>
            <input type="file" className="form-control" id="photo" name="photo" accept="image/*" required 
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setPhotoFile(e.target.files[0]);
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
            <div className='d-flex justify-content-between my-4'>
              <label htmlFor="title" className="form-label h2">Ингредиенты</label>
              <button type="button" className="btn btn-primary" onClick={addIngredient}>
                <i className="fa fa-plus"></i> Добавить
              </button>
            </div>

            {messAboutIngredients && <div className="alert alert-danger">{messAboutIngredients}</div>}

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
          </div>

          <div>
            <div className='d-flex justify-content-between my-4'>
              <label htmlFor="title" className="form-label h2">Шаги</label>
              <button type="button" className="btn btn-primary" onClick={addStep}>
                <i className="fa fa-plus"></i> Добавить
              </button>
            </div>

            {messAboutSteps && <div className="alert alert-danger">{messAboutSteps}</div>}

            {steps.map((step, index) => (
              <div key={index} className="mb-3 w-100 d-flex justify-content-around ">
                <p className='my-auto'>{index + 1}</p>

                <input
                  type="text"
                  placeholder="Описание действия"
                  value={step.instruction}
                  className="form-control w-50"
                  name={`step_${index}`}
                  id={`step_${index}`}
                  onChange={(e) =>
                    handleStepChange(index, 'instruction', e.target.value)
                  }
                />
                <button type="button" className="btn btn-danger" onClick={() => deleteStep(index)}>
                  <i className="fa fa-trash"></i>
                </button>

              </div>
            ))}
          </div>

          <div className="my-4 text-center">
            <button type="submit" className="btn btn-lg btn-success text-light w-50"><i className='fa fa-save'></i> Сохранить</button>
          </div>
        </form>
      </div>
    );
  }

export default CreateRecipe;