import React from 'react';
import {Step} from '../types/recipe';

type StepProps = {
    data: Step;
};

const IngredientLi: React.FC<StepProps> = ({data}) => {

  return (
    <div className="col-12 col-md-8 text-start">
        <p className="px-4"><span className="fw-bold me-4">{data.step_number}.</span> <span className="">{data.instruction}</span></p>
    </div>
  );
};

export default IngredientLi;
