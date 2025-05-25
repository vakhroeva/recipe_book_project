import React from 'react';
import {RecipeType} from '../types/recipe';
import { Link } from 'react-router-dom';
import { categoryColors } from 'constants/categoryColors';

type RecipeProps = {
    data: RecipeType;
};

const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength
        ? text.slice(0, maxLength) + '...'
        : text;
};

const Recipe: React.FC<RecipeProps> = ({data}) => {
    const backgroundTagColor = categoryColors[data.category.name] || '#ccc';

  return (
    <div className="col-12 col-md-6 col-xl-4 text-center p-2">
        <div className="border p-2 rounded">
            <Link to={`/recipe/${data.id}`} className="text-decoration-none text-dark">
                <p className="col-4 rounded fw-bold text-white" style={{ backgroundColor: backgroundTagColor }}><i className="fa fa-star me-1"></i>{data.category.name}</p>
                <img className="" 
                    src={`${process.env.REACT_APP_API_URL}${data.main_photo_url}`} 
                    alt="recipes photo" 
                    style={{
                        width: '300px',
                        height: '200px',
                        objectFit: 'contain'
                    }}
                />
                <p className='h3 mb-0'>{data.title}</p>
                <p>Author: {data.user.username}</p>
                <p className="text-start px-2">{truncate(data.description, 200)}</p>
            </Link>
        </div>
    </div>
  );
};

export default Recipe;
