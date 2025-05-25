import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/recipe/create');
  };

  return (
    <button onClick={handleClick} className="btn btn-primary rounded">
      <i className="fa fa-plus"></i>&nbsp;Добавить новый рецепт
    </button>
  );
};

export default AddRecipeButton;
