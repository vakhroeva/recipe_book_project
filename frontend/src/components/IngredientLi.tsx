import React from 'react';
import {Ingredient} from '../types/recipe';

type IngredientProps = {
    data: Ingredient;
};

const IngredientLi: React.FC<IngredientProps> = ({data}) => {

  return (
    <li className="d-flex flex-row justify-content-between px-4 border-bottom"><p className="w-50 text-start fw-bold mb-2">{data.name}</p> <p className="w-50 text-end mb-2">{data.amount}</p></li>
  );
};

export default IngredientLi;
