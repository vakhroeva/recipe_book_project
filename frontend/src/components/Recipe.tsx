import React from 'react';
import {RecipeType} from '../types/recipe';
import { Link } from 'react-router-dom';
import { categoryColors } from 'constants/categoryColors';
import { useAuth } from 'context/AuthContext';

type RecipeProps = {
    data: RecipeType;
    onDelete: (id: number) => void;
};

const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength
        ? text.slice(0, maxLength) + '...'
        : text;
};


const Recipe: React.FC<RecipeProps> = ({data, onDelete}) => {
    const backgroundTagColor = categoryColors[data.category.name] || '#ccc';
    const {userId, authToken} = useAuth();
    
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Вы уверены, что хотите удалить рецепт?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${data.id}`, {
                method: 'DELETE',
                headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json'
            },
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении рецепта');
            }

            onDelete(data.id); 

        } catch (error) {
            console.error(error);
            alert('Ошибка при удалении');
        }
    };

  return (
    <div className="col-12 col-md-6 col-xl-4 text-center p-2">
        <div className="border p-2 rounded">
            
            <div className='d-flex justify-content-between'>
                <p className="col-4 rounded fw-bold text-white" style={{ backgroundColor: backgroundTagColor }}><i className="fa fa-star me-1"></i>{data.category.name}</p>
                {Number(userId) === data.user.id && 
                    <div className='col-4'>
                        <Link to={`/recipe/edit/${data.id}`} className="col-5 btn btm-sm text-white btn-warning px-1 ms-1 py-0 text-decoration-none">
                            <i className="fa fa-edit"></i>
                        </Link>
                        <button className='col-5 btn btm-sm btn-danger px-1 ms-1 py-0' onClick={handleDelete}><i className="fa fa-trash"></i></button>
                    </div>
                }
            </div>

            <Link to={`/recipe/${data.id}`} className="text-decoration-none text-dark">
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
